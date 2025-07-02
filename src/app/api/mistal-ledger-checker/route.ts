import { NextRequest, NextResponse } from 'next/server'
import { Mistral } from '@mistralai/mistralai'

export interface MistralDocumentRequest {
  type: 'document_url'
  documentUrl: string
}

export async function POST(request: NextRequest) {
  try {
    const body: MistralDocumentRequest = await request.json()

    const apiKey = process.env.MISTRAL_API_KEY
    const client = new Mistral({ apiKey })

    const chatResponse = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Process this document and determine if it contains an itemized ledger of renter's costs and payments. If it does, simply return, in one sentence, "this document contains an itemized ledger"`,
            },
            {
              type: 'document_url',
              documentUrl: body.documentUrl,
            },
          ],
        },
      ],
    })

    const response = NextResponse.json({
      response: chatResponse.choices?.[0]?.message?.content,
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )

    return response
  } catch (err: any) {
    const response = NextResponse.json(
      { error: err?.message || 'Unknown error' },
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

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )

  return response
}
