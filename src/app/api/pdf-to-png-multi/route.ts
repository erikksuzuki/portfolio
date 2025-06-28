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
  const uploadForm = new FormData()
  uploadForm.append('file', buffer, file.name) // "file" is required!

  const apiKey = process.env.CLOUDMERSIVE_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 })
  }

  // Debug logs
  console.log('Uploading file:', file.name, 'size:', buffer.length)
  console.log('API key present:', !!apiKey)

  const resp = await fetch('https://api.cloudmersive.com/convert/pdf/to/png', {
    method: 'POST',
    headers: {
      ...uploadForm.getHeaders(),
      Apikey: apiKey,
    },
    body: uploadForm as any,
  })

  if (!resp.ok) {
    const errText = await resp.text()
    return NextResponse.json({ error: errText }, { status: resp.status })
  }

  const zipBuffer = Buffer.from(await resp.arrayBuffer())
  return new NextResponse(zipBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pages_${randomUUID()}.zip"`,
      'Access-Control-Allow-Origin': '*',
    },
  })
}
