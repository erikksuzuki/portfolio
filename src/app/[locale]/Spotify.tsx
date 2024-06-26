'use client'

import { useEffect, useState } from 'react'
import TopArtistsList from '../../components/SpotifySection/TopArtists'
import {
  getSpotifyPlayingNow,
  getSpotifyRecentlyPlayed,
  getSpotifyTopArtists,
} from '@/app/authService'
import SpotifyRecentTracks from '../../components/SpotifySection/RecentTracks'
import SpotifyAlbumMosaic from '../../components/SpotifySection/AlbumMosaic'
import SpotifyLoadingBackground from '@/assets/backgrounds/spotify.jpg'
// import jp from 'javascript-time-ago/locale/jp'

const SpotifySection = () => {
  const [topArtists, setTopArtists] = useState([])
  const [recentTracks, setRecentTracks] = useState([])
  const [playingNow, setPlayingNow] = useState<any>()

  async function getAndSetSpotifyData() {
    getSpotifyTopArtists(48, 'medium_term').then((data) =>
      setTopArtists(data.items)
    )
    getSpotifyRecentlyPlayed(10).then((data) => setRecentTracks(data.items))
    getSpotifyPlayingNow().then((data) => setPlayingNow(data))
  }

  useEffect(() => {
    getAndSetSpotifyData()
    // refresh spotify data every 5 minutes
    const interval = setInterval(() => {
      getAndSetSpotifyData()
    }, 300000)
    return clearInterval(interval)
  }, [])

  return (
    <section
      style={{
        backgroundImage: `url(${SpotifyLoadingBackground.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="w-full h-[720px] bg-[#000] border-white overflow-hidden relative"
    >
      {topArtists && <SpotifyAlbumMosaic topArtists={topArtists} />}
      <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-0 md:px-4 w-full mx-auto max-w-[1024px] relative">
        <SpotifyRecentTracks
          playingNow={playingNow}
          recentTracks={recentTracks}
        />
        <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-black rounded-lg border border-[rgba(255,255,255,0.1)]">
          <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
            <h2 className="text-theme-sm mb-4">Most Played Artists:</h2>
            <TopArtistsList data={topArtists} />
          </div>
        </aside>
      </section>
    </section>
  )
}

export default SpotifySection
