export async function getGameDetails(appid: string) {
  const response = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${appid}&l=en`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game schema'
    })

  return response
}
