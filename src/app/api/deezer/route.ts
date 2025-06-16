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

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  // Note: Do NOT set Access-Control-Allow-Credentials with '*' origin
  // because browsers block this combination

  return response
}

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
}
