import { NextRequest, NextResponse } from 'next/server'
// import { Mistral } from '@mistralai/mistralai'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { documentUrl } = await request.json()
    const response = NextResponse.json({
      response: documentUrl, // Replace with your chatResponse when ready
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response
  } catch (err: any) {
    const response = NextResponse.json(
      { error: err?.message || 'Unknown error' },
      { status: 500 }
    )
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
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
