export async function getGameSchema(appid: string) {
  const response = await fetch(
    `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&appid=${appid}&l=english&format=json`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game schema'
    })

  return response
}
