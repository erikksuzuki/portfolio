import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const smile: any = searchParams.get('smile')

  return NextResponse.json(Math.floor(Math.random() * 3000 * -1))
}
