import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import { createCanvas } from 'canvas'

GlobalWorkerOptions.workerSrc = pdfjsWorker

// CORS support
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ error: 'Invalid Content-Type' }), {
      status: 400,
    })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || file.type !== 'application/pdf') {
    return new Response(JSON.stringify({ error: 'Invalid file' }), {
      status: 400,
    })
  }

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise
  const page = await pdf.getPage(1)

  const scale = 2.0
  const viewport = page.getViewport({ scale })

  const canvas = createCanvas(viewport.width, viewport.height)
  const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D
  await page.render({ canvasContext: context, viewport }).promise

  const base64 = canvas.toDataURL('image/png')

  return new Response(JSON.stringify({ base64 }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
