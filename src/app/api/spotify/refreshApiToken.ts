import { createClient } from '@/utils/supabase/server'

export async function refreshApiToken(refreshToken: string) {
  // format the post body
  const details: any = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  }
  let params = []
  for (let property in details) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(details[property])
    params.push(encodedKey + '=' + encodedValue)
  }
  const formBody = params.join('&')

  // make the fetch request with formatted post body
  let refreshError: string | undefined = undefined
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.SPOTIFY_AUTHORIZATION_STRING}=`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
    cache: 'no-cache',
  })
    .then((result) => result.json())
    .then((data) => data)
    .catch(() => {
      refreshError = 'An error occured when refreshing token'
    })

  // function to calculate the time of token expiration
  function oneHourFromCreation(date: Date) {
    const addedTime = 3600000
    date.setTime(date.getTime() + addedTime)
    return date
  }

  // update database with new tokens and their timestamps
  await createClient()
    .from('spotify')
    .update(
      !response.refresh_token
        ? {
            access_token: response.access_token,
            created_at: new Date(),
            expires_at: oneHourFromCreation(new Date()),
          }
        : {
            access_token: response.access_token,
            created_at: new Date(),
            expires_at: oneHourFromCreation(new Date()),
            refresh_token: response.refresh_token,
          }
    )
    .eq('id', '1')
    .select()

  return response
}
