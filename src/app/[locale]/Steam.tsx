'use client'

import { useEffect, useState } from 'react'
import { getSteamGameInfo, getSteamPlayerInfo } from '@/app/authService'
import SteamRecentGames from '@/components/SteamSection/RecentGames'
import { formatDateOrdinal } from '@/utils/formatDateTime'
import Image from 'next/image'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import Link from 'next/link'
import IconExternalPage from '@/assets/icons/common/IconExternalPage'
import SteamLoadingBackground from '@/assets/backgrounds/steam.jpg'
import { useResponsive } from '@/hooks/useResponsive'
// import jp from 'javascript-time-ago/locale/jp'

const SteamSection = () => {
  const { isAboveMd } = useResponsive('md')
  const humanizeDuration = require('humanize-duration')
  const [playerData, setPlayerData] = useState<any>()
  const [gameData, setGameData] = useState<any>()

  async function getAndSetPlayerData() {
    getSteamPlayerInfo().then((data) => setPlayerData(data))
  }

  async function getAndSetGameData(appid: number) {
    console.log(`Data fetched for Steam game with appid: ${appid}`)
    getSteamGameInfo(appid).then((data) => setGameData(data))
  }

  useEffect(() => {
    !playerData && getAndSetPlayerData()
  }, [playerData])

  useEffect(() => {
    playerData && getAndSetGameData(playerData?.data?.recently_played[0].appid)
  }, [playerData])

  const bgOverrides = [690040, 976900, 976730]
  const overrideBg = bgOverrides.includes(gameData?.appid) ? true : false
  const releaseDateFormatted = gameData
    ? formatDateOrdinal(gameData.details.release_date, true, true)
    : ''

  return (
    <section
      style={{
        backgroundImage: `url(${
          !gameData || !isAboveMd
            ? SteamLoadingBackground.src
            : gameData.details.backgrounds[overrideBg ? 0 : 1]
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
        <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-blacker rounded-lg border border-[rgba(255,255,255,0.1)]">
          <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
            <div className="flex flex-row justify-between items-end mb-3">
              <h2 className="text-theme-sm">{gameData?.details.name}</h2>
              <p className="text-theme-xs">Released {releaseDateFormatted}</p>
            </div>
            <p className="text-theme-xs mb-3">
              {gameData?.details.short_description}
            </p>
            <p className="text-theme-xs mb-3">
              Total playtime since account creation:
              <br />
              {humanizeDuration(
                playerData?.data?.recently_played.filter((game: any) => {
                  return Number(game?.appid) === Number(gameData?.appid)
                })[0]?.playtime_forever * 60000,
                { units: ['h', 'm', 's', 'ms'] }
              )}
            </p>
            <ul className="">
              {gameData?.achievements?.unlockedAchievements &&
                gameData?.achievements?.unlockedAchievements
                  .slice(0, 24)
                  .map((achievement: any) => {
                    return (
                      <Tooltip.Provider
                        key={achievement.name}
                        delayDuration={0}
                      >
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <li className="border border-[rgba(255,155,0,0.6)] w-[24px] h-[24px] inline-block mr-2">
                              <Image
                                width={24}
                                height={24}
                                alt={achievement.display_name}
                                src={achievement.icon}
                              />
                            </li>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="TooltipContent"
                              sideOffset={5}
                            >
                              <div className="max-w-[280px]">
                                <h2 className="text-theme-sm text-[rgb(255,195,0)]">
                                  {achievement.display_name}
                                </h2>
                                <p
                                  className={clsx('text-theme-xs mb-3', {
                                    'italic text-[rgba(255,255,255,0.6)]':
                                      !achievement.description,
                                  })}
                                >
                                  {achievement.description ??
                                    'Hidden achievement'}
                                </p>
                                <p className="text-theme-xs">
                                  Unlocked:{' '}
                                  {formatDateOrdinal(
                                    achievement.unlocktime,
                                    true,
                                    true
                                  )}
                                </p>
                              </div>
                              <Tooltip.Arrow className="TooltipArrow" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )
                  })}
            </ul>
            {gameData?.achievements?.unlockedAchievements && (
              <p className="text-theme-xs mb-2">
                {`${gameData?.achievements?.unlockedAchievementCount} / ${gameData?.achievements?.maxAchievementCount}`}{' '}
                achievements unlocked
              </p>
            )}
            <Link
              className="text-theme-xs flex items-center justify-start gap-x-2 text-[rgba(255,255,255,0.8)] hover:text-[rgba(0,195,255)]"
              href={`https://store.steampowered.com/app/${gameData?.appid}/`}
              target="_blank"
            >
              Visit Steam store page <IconExternalPage className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      </section>
    </section>
  )
}

export default SteamSection
