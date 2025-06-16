import { createClient } from '@/utils/supabase/server'

export async function getIGDBToken() {}

export async function refreshIGDBToken() {
  // format the post body

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      grant_type: 'client_credentials',
    }),
  })
  const data = await res.json()
  const access_token = data.access_token

  // function to calculate the time of token expiration
  function oneMonthFromCreation(date: Date) {
    const addedTime = 3600000 * 730
    date.setTime(date.getTime() + addedTime)
    return date
  }

  // update database with new tokens and their timestamps
  await createClient()
    .from('twitch')
    .update({
      access_token: access_token,
      created_at: new Date(),
      expires_at: oneMonthFromCreation(new Date()),
    })
    .eq('id', '1')
    .select()

  return access_token
}
