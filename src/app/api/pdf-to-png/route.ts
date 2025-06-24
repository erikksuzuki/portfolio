import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.PDF4ME_KEY!
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'application/pdf') {
    return new Response(JSON.stringify({ error: 'Invalid file' }), {
      status: 400,
      headers: corsHeaders,
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
      headers: corsHeaders,
    })
  }

  const blob = await res.blob()

  return new Response(blob, {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': blob.type,
    },
  })
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
