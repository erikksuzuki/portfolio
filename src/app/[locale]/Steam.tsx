'use client'

import { useEffect, useState } from 'react'
import { getSteamGameInfo, getSteamPlayerInfo } from '@/app/authService'
import SteamRecentGames from '@/components/SteamSection/RecentGames'
import { formatDateOrdinal } from '@/utils/formatDateTime'
// import jp from 'javascript-time-ago/locale/jp'

const SteamSection = () => {
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

  const bgOverrides = ['690040']
  const overrideBg = bgOverrides.includes(gameData?.appid) ? true : false
  const releaseDateFormatted = gameData
    ? formatDateOrdinal(gameData.details.release_date, true, true)
    : ''

  return (
    <section
      style={{
        backgroundImage: `url(${
          gameData ? gameData.details.backgrounds[overrideBg ? 0 : 1] : ''
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="w-full h-[720px] bg-[#000] border-white overflow-hidden relative"
    >
      <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-0 md:px-4 w-full mx-auto max-w-[1024px] relative">
        <SteamRecentGames
          recentlyPlayed={playerData?.data?.recently_played}
          setGameData={getAndSetGameData}
        />
        <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-black rounded-lg border border-[rgba(255,255,255,0.1)]">
          <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
            <div className="flex flex-row justify-between items-end mb-3">
              <h2 className="text-theme-sm">{gameData?.details.name}</h2>
              <p className="text-theme-xs">Released {releaseDateFormatted}</p>
            </div>
            <p className="text-theme-xs">
              {gameData?.details.short_description}
            </p>
          </div>
        </aside>
      </section>
    </section>
  )
}

export default SteamSection
