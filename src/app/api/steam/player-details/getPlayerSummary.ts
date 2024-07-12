export async function getPlayerSummary() {
  const response = await fetch(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamids=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game achievements'
    })

  return response
}
