'use client'

import { useEffect, useState } from 'react'
import { getSteamGameInfo, getSteamPlayerInfo } from '@/app/authService'
import SteamRecentGames from '@/components/SteamSection/RecentGames'
import SteamLoadingBackground from '@/assets/backgrounds/steam.jpg'
import { useResponsive } from '@/hooks/useResponsive'
import SteamGameDetails from '@/components/SteamSection/GameDetails'

const SteamSection = () => {
  const { isAboveMd } = useResponsive('md')
  const [playerData, setPlayerData] = useState<any>()
  const [gameData, setGameData] = useState<any>()

  async function getAndSetPlayerData() {
    getSteamPlayerInfo().then((data) => setPlayerData(data))
  }

  async function getAndSetGameData(appid: number) {
    getSteamGameInfo(appid).then((data) => setGameData(data))
  }

  useEffect(() => {
    !playerData && getAndSetPlayerData()
  }, [playerData])

  useEffect(() => {
    playerData && getAndSetGameData(playerData?.data?.recently_played[0].appid)
  }, [playerData])

  return (
    <section
      style={{
        backgroundImage: `url(${
          !gameData || !isAboveMd
            ? SteamLoadingBackground.src
            : gameData.details.backgrounds[0]
        })`,
        backgroundColor: '#080E3D',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="w-full h-[720px] bg-[#000] border-white overflow-hidden relative"
    >
      <div className="bg-steam-backdrop">
        <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-0 md:px-4 w-full mx-auto max-w-[1024px] relative">
          <SteamRecentGames
            recentlyPlayed={playerData?.data?.recently_played}
            playerData={playerData}
            setGameData={getAndSetGameData}
          />
          <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-blacker rounded-lg border border-[rgba(255,255,255,0.1)] relative">
            <SteamGameDetails gameData={gameData} playerData={playerData} />
          </aside>
        </section>
      </div>
    </section>
  )
}

export default SteamSection
