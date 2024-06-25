import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { refreshApiToken } from './refreshApiToken'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const endpoint: any = searchParams.get('endpoint')
  const time_range: any = searchParams.get('time_range')
  const limit: any = searchParams.get('limit')
  const { data: existingTokens } = await createClient()
    .from('spotify')
    .select('*')
    .single()
  const now = new Date().getTime()
  const expiredTime = new Date(existingTokens.expires_at).getTime()
  const tokenHasExpired = now > expiredTime

  async function fetchData(accessToken: string) {
    return await fetch(
      `https://api.spotify.com/v1/me/${endpoint}?time_range=${time_range}&limit=${limit}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    ).then((result) => result.json())
  }

  async function getSpotifyData() {
    // if valid access token exists, use it to fetch data
    if (!tokenHasExpired) {
      return await fetchData(existingTokens.access_token)
      // if access token has expired, refresh the token and use the new one to fetch data
    } else if (tokenHasExpired) {
      const refreshedTokens: any = await refreshApiToken(
        existingTokens.refresh_token
      )
      return await fetchData(refreshedTokens.access_token)
    }
  }
  const spotifyData = await getSpotifyData()
  return NextResponse.json(spotifyData)
}
