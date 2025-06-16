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

  return NextResponse.json(
    {
      success,
      error,
      searchQuery,
      response: albumResults,
    },
    { status: !success ? (albumResults ? 404 : 400) : 200 }
  )
}
