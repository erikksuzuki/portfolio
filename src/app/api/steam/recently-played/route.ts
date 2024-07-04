import { NextResponse } from 'next/server'

export async function GET() {
  async function fetchData() {
    return await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}`,
      { method: 'GET' }
    ).then((result) => result.json())
  }

  async function getRecentlyPlayedGames() {
    return await fetchData()
  }
  const recentlyPlayedGames = await getRecentlyPlayedGames()
  return NextResponse.json(recentlyPlayedGames)
}
