import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const pdfFile = formData.get('file') as File

  if (!pdfFile) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    const apiKey = process.env.PDF4ME_KEY!
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())
    const base64Pdf = pdfBuffer.toString('base64')

    const body = {
      document: {
        docData: base64Pdf,
      },
      imageAction: {
        imageQuality: 90,
        widthPixel: 1000,
        heightPixel: 1000,
        imageExtension: 'Jpeg',
      },
    }

    const pdf4meResponse = await fetch(
      'https://api.pdf4me.com/Make/CreateImages',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!pdf4meResponse.ok) {
      const errText = await pdf4meResponse.text()
      throw new Error(`PDF4me error ${pdf4meResponse.status}: ${errText}`)
    }

    const result = await pdf4meResponse.json()

    const images = result.document.pages.map(
      (page: any) => `data:image/jpeg;base64,${page.thumbnail}`
    )
    const response = NextResponse.json(
      { base64Images: images },
      { status: 200 }
    )

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    console.error('PDF4me proxy error:', err.message)
    const response = NextResponse.json({ error: err.message }, { status: 500 })
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
