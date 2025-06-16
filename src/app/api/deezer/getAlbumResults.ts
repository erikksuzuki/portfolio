export async function getAlbumResults(searchQuery: string) {
  const response = await fetch(
    `https://api.deezer.com/search?q=${searchQuery}`,
    { method: 'GET' }
  )
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      return 'An error occured when fetching game schema'
    })

  return response
}
