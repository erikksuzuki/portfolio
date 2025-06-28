import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import FormData from 'form-data'
import axios from 'axios'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    const { base64, filename } = await request.json()
    if (!base64 || !filename) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    } else {
      // do something
    }
  } else {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadForm = new FormData()
    uploadForm.append('file', buffer, file.name)

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
          filename: file.name,
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
      console.error(err.response?.data || err.message)
      const response = NextResponse.json(
        { error: err.response?.data || err.message },
        { status: 500 }
      )
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      )
      return response
    }
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
