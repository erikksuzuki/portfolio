export async function getPlayerGameStats(appid: string) {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game stats'
    })

  return response
}
