export const runtime = 'nodejs'
import { NextResponse } from 'next/server'
import { find } from 'geo-tz'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = Number(searchParams.get('lat') || '')
  const lon = Number(searchParams.get('lon') || '')

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      { error: 'Invalid or missing lat/lon' },
      { status: 400 }
    )
  }

  try {
    const timezones = find(lat, lon)

    const response = NextResponse.json({ timezone: timezones[0] })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (error) {
    console.error(error)
    const response = NextResponse.json(
      { error: 'Failed to determine timezone' },
      { status: 500 }
    )
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
