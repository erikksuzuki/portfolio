import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { refreshIGDBToken } from './refreshIGDBToken'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const query: any = searchParams.get('query')
  const { data: existingTokenData } = await createClient()
    .from('twitch')
    .select('*')
    .single()
  const now = new Date().getTime()
  const expiredTime = existingTokenData?.expires_at
    ? new Date(existingTokenData.expires_at).getTime()
    : new Date().getTime() - 3600000 // Default to 1 hour if no expiration time is set
  const tokenHasExpired: boolean = now > expiredTime

  async function fetchGames(accessToken: string) {
    const res = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'text/plain',
      },
      body: `fields name, cover.url, genres.name, first_release_date, involved_companies.company.name, involved_companies.publisher, category; limit 10; search "${query}";`,
    })
    const data = await res.json()

    return data
  }

  async function getIGDBData() {
    // if valid access token exists, use it to fetch data
    if (!tokenHasExpired) {
      return await fetchGames(existingTokenData.access_token)
      // if access token has expired, refresh the token and use the new one to fetch data
    } else if (tokenHasExpired) {
      const refreshedToken: any = await refreshIGDBToken()
      return await fetchGames(refreshedToken)
    }
  }
  const igdbData = await getIGDBData()

  const response = NextResponse.json(igdbData)

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
