import { NextRequest, NextResponse } from 'next/server'
import pdf4me from 'pdf4me'

export async function POST(request: NextRequest) {
  // const createClient = (pdf4me as any).createClient
  const formData = await request.formData()
  const pdfFile = formData.get('file') as File
  if (!pdfFile) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    const apiKey = process.env.PDF4ME_KEY!
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())

    // @ts-ignore typescript definitions don't exist for nextjs
    const pdf4meClient = pdf4me.createClient(apiKey)

    const createImagesReq = {
      document: {
        docData: pdfBuffer.toString('base64'),
      },
      imageAction: {
        pageSelection: { pageNrs: [1] },
        imageQuality: 90,
        widthPixel: 1000,
        heightPixel: 1000,
        imageExtension: 'Jpeg',
      },
    }

    const createImagesRes = await pdf4meClient.createImages(createImagesReq)
    const base64Image = createImagesRes.document.pages[0].thumbnail

    const dataUri = `data:image/jpeg;base64,${base64Image}`

    const response = NextResponse.json({ base64: dataUri })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    console.error(err)
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
