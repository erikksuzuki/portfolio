import { find } from 'geo-tz'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = parseFloat(searchParams.get('lat') || '')
  const lon = parseFloat(searchParams.get('lon') || '')

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      { error: 'Invalid or missing lat/lon' },
      { status: 400 }
    )
  }

  try {
    const timezones = find(lat, lon)
    return NextResponse.json({ timezone: timezones[0] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to determine timezone' },
      { status: 500 }
    )
  }
}
