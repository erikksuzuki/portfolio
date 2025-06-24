import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  // 1. Parse the incoming form data to get the PDF file
  const formData = await request.formData()
  const pdfFile = formData.get('file') as File
  if (!pdfFile) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    // 2. Send the PDF file to PDF4me /v1/PdfToImage API
    const apiKey = process.env.PDF4ME_KEY // PDF4me API key from env
    const pdfBuffer = await pdfFile.arrayBuffer() // get binary content of PDF
    const pdf4meResponse = await fetch('https://api.pdf4me.com/v1/PdfToImage', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${apiKey}`, // Basic auth with API key:contentReference[oaicite:2]{index=2}
        'Content-Type': pdfFile.type || 'application/pdf',
      },
      body: pdfBuffer, // send PDF data
    })

    if (!pdf4meResponse.ok) {
      throw new Error(`PDF4me API error: ${pdf4meResponse.status}`)
    }

    // 3. Read the image bytes from PDF4me response
    const imageArrayBuffer = await pdf4meResponse.arrayBuffer()
    const contentType =
      pdf4meResponse.headers.get('content-type') || 'image/png'
    // 4. Convert image bytes to Base64 string
    const base64Image = Buffer.from(new Uint8Array(imageArrayBuffer)).toString(
      'base64'
    )
    const dataUri = `data:${contentType};base64,${base64Image}`

    // 5. Return JSON with base64 data URI, including CORS headers
    const response = NextResponse.json(
      {
        base64: dataUri,
      },
      { status: 200 }
    )

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    // Note: Do NOT set Access-Control-Allow-Credentials with '*' origin
    // because browsers block this combination

    return response
  } catch (err: any) {
    console.error('Error in PDF4me proxy:', err)
    return NextResponse.json(
      { error: err.message || 'Conversion failed' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
}
