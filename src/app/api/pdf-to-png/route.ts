import type { NextApiRequest, NextApiResponse } from 'next'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import { createCanvas } from 'canvas'
import multer from 'multer'

GlobalWorkerOptions.workerSrc = pdfjsWorker

const upload = multer({ storage: multer.memoryStorage() })

export const config = { api: { bodyParser: false } }

// ---- middleware wrapper ----
const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) =>
  new Promise((resolve, reject) => {
    fn(req, res, (err: any) => {
      if (err) return reject(err)
      resolve(null)
    })
  })

// ---- handler ----
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, upload.single('file'))

  const file = (req as any).file
  if (!file || file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Invalid file' })
  }

  const pdf = await getDocument({ data: file.buffer }).promise
  const page = await pdf.getPage(1)

  const scale = 2.0
  const viewport = page.getViewport({ scale })

  const canvas = createCanvas(viewport.width, viewport.height)
  const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D

  await page.render({ canvasContext: context, viewport }).promise

  const base64 = canvas.toDataURL('image/png')
  return res.status(200).json({ base64 })
}
