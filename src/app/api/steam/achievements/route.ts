import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const appid: any = searchParams.get('appid')

  async function fetchData() {
    return await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}`,
      { method: 'GET' }
    ).then((result) => result.json())
  }

  async function getPlayerAchievements() {
    return await fetchData()
  }
  const playerAchievements = await getPlayerAchievements()
  return NextResponse.json(playerAchievements)
}
