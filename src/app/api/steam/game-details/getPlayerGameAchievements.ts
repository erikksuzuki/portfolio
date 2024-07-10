export async function getPlayerGameAchievements(appid: string) {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game achievements'
    })

  return response
}
