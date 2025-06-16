import { NextRequest, NextResponse } from 'next/server'
import { getAlbumResults } from './getAlbumResults'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const searchQuery: any = searchParams.get('searchQuery')

  const albumResults: any = await getAlbumResults(searchQuery)

  const success: boolean = albumResults ? true : false
  const error = !success
    ? albumResults
      ? 'Could not find albums on Deezer'
      : 'Deezer search query did not provided any results'
    : undefined

  const response = NextResponse.json(
    {
      success,
      error,
      searchQuery,
      response: albumResults,
    },
    { status: !success ? (albumResults ? 404 : 400) : 200 }
  )

  // --- CORS headers here ---
  const origin = request.headers.get('origin') || ''

  const allowedOrigins = [
    'https://peij-webapp.vercel.app',
    'http://localhost:5173',
    // add your other allowed origins here
  ]

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  // For OPTIONS preflight requests, we have to respond separately (see below)

  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Allow-Credentials', 'true') // if needed

  return response
}

// Also handle OPTIONS preflight request
export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 })

  const origin = request.headers.get('origin') || ''

  const allowedOrigins = [
    'https://project1.vercel.app',
    'https://project2.vercel.app',
  ]

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}
