import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const pdf4meKey = process.env.PDF4ME_KEY!
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'application/pdf') {
    return new Response(JSON.stringify({ error: 'Invalid file' }), {
      status: 400,
    })
  }

  const forwardForm = new FormData()
  forwardForm.append('file', file)

  const pdf4meRes = await fetch('https://api.pdf4me.com/v1/PdfToImage', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${pdf4meKey}`,
    },
    body: forwardForm,
  })

  if (!pdf4meRes.ok) {
    const errorText = await pdf4meRes.text()
    return new Response(errorText, { status: pdf4meRes.status })
  }

  const imageBlob = await pdf4meRes.blob()

  return new Response(imageBlob, {
    status: 200,
    headers: {
      'Content-Type': imageBlob.type,
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
