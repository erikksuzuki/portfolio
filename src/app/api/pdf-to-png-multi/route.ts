import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import FormData from 'form-data'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Construct a new FormData for the Cloudmersive API
  const uploadForm = new FormData()
  uploadForm.append('file', buffer, file.name)

  // Call Cloudmersive REST API
  const apiKey = process.env.CLOUDMERSIVE_KEY!
  const cloudmersiveResponse = await fetch(
    'https://api.cloudmersive.com/convert/pdf/to/png',
    {
      method: 'POST',
      headers: {
        ...uploadForm.getHeaders(),
        Apikey: apiKey,
      },
      body: uploadForm as any,
    }
  )

  if (!cloudmersiveResponse.ok) {
    const errText = await cloudmersiveResponse.text()
    return NextResponse.json(
      { error: errText },
      { status: cloudmersiveResponse.status }
    )
  }

  // Cloudmersive returns a zip file with images (PNG) for all pages.
  const resultBuffer = Buffer.from(await cloudmersiveResponse.arrayBuffer())

  // You can respond with base64, or save to storage, or return download link
  return new NextResponse(resultBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pages_${randomUUID()}.zip"`,
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
