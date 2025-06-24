import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const pdfFile = formData.get('file') as File
  if (!pdfFile) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    const apiKey = process.env.PDF4ME_KEY!
    const pdfBuffer = await pdfFile.arrayBuffer()

    const pdf4meResponse = await fetch('https://api.pdf4me.com/v1/PdfToImage', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${apiKey}`,
        'Content-Type': 'application/pdf',
      },
      body: pdfBuffer,
    })

    if (!pdf4meResponse.ok) {
      throw new Error(`PDF4me API error: ${pdf4meResponse.status}`)
    }

    const imageArrayBuffer = await pdf4meResponse.arrayBuffer()
    const contentType =
      pdf4meResponse.headers.get('content-type') || 'image/png'
    const base64Image = Buffer.from(new Uint8Array(imageArrayBuffer)).toString(
      'base64'
    )
    const dataUri = `data:${contentType};base64,${base64Image}`

    const response = NextResponse.json({ base64: dataUri })
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ✅ IMPORTANT: Use `new Response()` for OPTIONS (not NextResponse.json)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
