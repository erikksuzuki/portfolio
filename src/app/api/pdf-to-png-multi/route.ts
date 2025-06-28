import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import FormData from 'form-data'
import axios from 'axios'

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
  uploadForm.append('file', buffer, file.name)

  const apiKey = process.env.CLOUDMERSIVE_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 })
  }

  // Use axios instead of fetch
  try {
    const cloudResponse = await axios.post(
      'https://api.cloudmersive.com/convert/pdf/to/png',
      uploadForm,
      {
        headers: {
          ...uploadForm.getHeaders(),
          Apikey: apiKey,
        },
      }
    )

    return new NextResponse(cloudResponse.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="pages_${randomUUID()}.zip"`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err: any) {
    console.error(err.response?.data || err.message)
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    )
  }
}
