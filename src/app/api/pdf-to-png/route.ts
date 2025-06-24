import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.PDF4ME_KEY!
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'application/pdf') {
    return new Response(JSON.stringify({ error: 'Invalid file' }), {
      status: 400,
    })
  }

  const forwardForm = new FormData()
  forwardForm.append('file', file)

  const res = await fetch('https://api.pdf4me.com/v1/PdfToImage', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${apiKey}`,
    },
    body: forwardForm,
  })

  if (!res.ok) {
    return new Response(await res.text(), {
      status: res.status,
    })
  }

  const blob = await res.blob()

  const response = new Response(blob, {
    status: 200,
    headers: {
      'Content-Type': blob.type,
    },
  })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  // Note: Do NOT set Access-Control-Allow-Credentials with '*' origin
  // because browsers block this combination

  return response
}

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
}
