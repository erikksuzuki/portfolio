import axios from 'axios'
import FormData from 'form-data'
import { Buffer } from 'buffer'

export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

function streamToString(stream: any) {
  const chunks: any = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err: any) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

export async function POST(request: NextRequest) {
  let extractedFilename
  const contentType = request.headers.get('content-type') || ''

  let buffer
  if (contentType.includes('multipart/form-data')) {
    // * from frontend web upload
    const formData = await request.formData()
    const file = formData.get('file') as File
    extractedFilename = file.name
    if (!file) throw new Error('No file uploaded')

    const arrayBuffer = await file.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } else {
    // * from node upload
    const { base64, filename } = await request.json()
    extractedFilename = filename
    buffer = Buffer.from(base64, 'base64')
  }

  try {
    const uploadForm = new FormData()
    uploadForm.append(
      'instructions',
      JSON.stringify({
        parts: [{ file: 'document' }],
        output: {
          pages: { start: 0, end: -1 },
          type: 'image',
          format: 'png',
          dpi: 72,
        },
      })
    )
    uploadForm.append('document', buffer, {
      filename: extractedFilename,
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
        responseType: 'stream',
      }
    )

    const response = NextResponse.json({
      filename: extractedFilename,
      sessionId: randomUUID(),
      serviceResponse: serviceResponse,
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    const errorString = await streamToString(err.response.data)

    const response = NextResponse.json({ error: errorString }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }
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
