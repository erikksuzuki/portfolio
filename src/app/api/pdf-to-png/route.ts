import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import FormData from 'form-data'
import { Buffer } from 'buffer'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadForm = new FormData()
    uploadForm.append(
      'instructions',
      JSON.stringify({
        parts: [{ file: 'document' }],
        output: {
          type: 'image',
          format: 'png',
          dpi: 36,
        },
      })
    )
    uploadForm.append('document', buffer, {
      filename: 'document.pdf',
      contentType: 'application/pdf',
    })

    const serviceResponse = await axios.post(
      'https://api.pspdfkit.com/build',
      uploadForm,
      {
        headers: {
          ...uploadForm.getHeaders(),
          Authorization: `Bearer ${process.env.PSPDFKIT_API_KEY}`,
        },
        responseType: 'arraybuffer',
      }
    )

    const base64 = Buffer.from(serviceResponse.data).toString('base64')

    const response = NextResponse.json({
      image: `data:image/png;base64,${base64}`,
    })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    const message = await parseStreamError(err)
    const response = NextResponse.json({ error: message }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }
}

async function parseStreamError(err: any): Promise<string> {
  try {
    const buffer = await streamToBuffer(err.response?.data)
    return buffer.toString('utf8')
  } catch {
    return 'Unknown error'
  }
}

function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = []
    stream.on('data', (chunk: any) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
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
