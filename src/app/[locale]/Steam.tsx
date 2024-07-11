'use client'

import { useEffect, useState } from 'react'
import { getSteamGameInfo, getSteamPlayerInfo } from '@/app/authService'
import SpotifyLoadingBackground from '@/assets/backgrounds/spotify.jpg'
import SteamRecentGames from '@/components/SteamSection/RecentGames'
// import jp from 'javascript-time-ago/locale/jp'

const SteamSection = () => {
  const [playerData, setPlayerData] = useState<
    { recently_played: any } | undefined
  >()
  const [gameData, setGameData] = useState()

  async function getAndSetPlayerData() {
    getSteamPlayerInfo().then((data) => setPlayerData(data))
  }

  async function getAndSetGameData(appid: number) {
    getSteamGameInfo(appid).then((data) => setGameData(data))
  }

  useEffect(() => {
    getAndSetPlayerData()
    // refresh spotify data every 5 minutes
    const interval = setInterval(() => {
      getAndSetPlayerData()
    }, 300000)
    return clearInterval(interval)
  }, [])

  useEffect(() => {
    getAndSetGameData(playerData?.recently_played[0].appid)
  }, [playerData])

  return (
    <section
      style={{
        backgroundImage: `url(${SpotifyLoadingBackground.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="w-full h-[720px] bg-[#000] border-white overflow-hidden relative"
    >
      <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-0 md:px-4 w-full mx-auto max-w-[1024px] relative">
        <SteamRecentGames recentlyPlayed={playerData?.recently_played} />
        <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-black rounded-lg border border-[rgba(255,255,255,0.1)]">
          <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
            <h2 className="text-theme-sm mb-4">Most Played Artists:</h2>
            <span className="text-theme-xs">{JSON.stringify(gameData)}</span>
          </div>
        </aside>
      </section>
    </section>
  )
}

export default SteamSection
