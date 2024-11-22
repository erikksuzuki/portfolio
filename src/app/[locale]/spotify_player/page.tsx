import { createClient } from '@/utils/supabase/server'
import SpotifyClient from './client'

const SpotifyLayout = async () => {
  const { data: existingTokens } = await createClient()
    .from('spotify')
    .select('*')
    .single()

  return <SpotifyClient />
}

export default SpotifyLayout
