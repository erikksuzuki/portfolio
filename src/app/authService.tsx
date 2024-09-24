const getHeaders = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': `application/json`,
  },
}

type SpotifyTimeRange = 'short_term' | 'medium_term' | 'long_term'
export async function getSpotifyTopArtists(
  limit: number = 48,
  timeRange: SpotifyTimeRange = 'medium_term'
) {
  try {
    const response = await fetch(
      `/api/spotify?endpoint=top/artists&limit=${limit}&time_range=${timeRange}`,
      getHeaders
    )
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export async function getSpotifyRecentlyPlayed(limit: number = 10) {
  try {
    const response = await fetch(
      `/api/spotify?endpoint=player/recently-played&limit=${limit}`,
      getHeaders
    )
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export async function getSpotifyPlayingNow() {
  try {
    const response = await fetch(`/api/spotify?endpoint=player`, getHeaders)
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getSteamGameInfo(steamAppID: number) {
  try {
    const response = await fetch(
      `/api/steam/game-details?appid=${steamAppID}`,
      getHeaders
    )
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getSteamPlayerInfo() {
  try {
    const response = await fetch(`/api/steam/player-details`, getHeaders)
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getTemperatureFromSmile(smile: string) {
  try {
    const response = await fetch(
      `/api/coding-interview?smile=${smile}`,
      getHeaders
    )
    if (response) return await response.json()
  } catch (error) {
    console.log(error)
  }
}
