import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import FormData from 'form-data'
import axios from 'axios'
import { Buffer } from 'buffer'

export const runtime = 'nodejs'

async function pdfToPngMulti(buffer: any, filename: string) {
  const uploadForm = new FormData()
  uploadForm.append('file', buffer, {
    filename: filename,
    contentType: 'application/pdf',
  })

  const apiKey = process.env.CLOUDMERSIVE_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 })
  }

  try {
    const cloudResponse: any = await axios.post(
      'https://api.cloudmersive.com/convert/pdf/to/png',
      uploadForm,
      {
        headers: {
          ...uploadForm.getHeaders(),
          Apikey: apiKey,
        },
        responseType: 'json', // receive parsed JSON
      }
    )

    const response = NextResponse.json(
      {
        filename: filename,
        sessionId: randomUUID(),
        pages: cloudResponse.data.PngResultPages,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    const response = NextResponse.json({ error: err }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    const { base64, filename } = await request.json()
    if (!base64 || !filename) {
      return NextResponse.json(
        { error: 'No file or base64 provided' },
        { status: 400 }
      )
    } else {
      const buffer = Buffer.from(base64, 'base64')
      return pdfToPngMulti(buffer, filename)
    }
  } else {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return pdfToPngMulti(buffer, file.name)
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
