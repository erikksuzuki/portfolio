export async function getPlayerRecentlyPlayed() {
  const response = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=${process.env.NEXT_PUBLIC_STEAM_PROFILE_ID}&format=json&include_appinfo=true`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) =>
      data.response.games
        .sort((a: any, b: any) =>
          a.rtime_last_played > b.rtime_last_played ? -1 : 1
        )
        .slice(0, 5)
    )
    .catch(() => {
      return 'An error occured when fetching game achievements'
    })

  return response
}
