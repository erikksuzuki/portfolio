'use client'

import { formatDateOrdinal } from '@/utils/formatDateTime'
import Image from 'next/image'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import Link from 'next/link'
import IconExternalPage from '@/assets/icons/common/IconExternalPage'

const SteamGameDetails = ({ gameData, playerData }: any) => {
  const humanizeDuration = require('humanize-duration')
  const releaseDateFormatted = gameData
    ? formatDateOrdinal(gameData.details.release_date, true, true)
    : ''
  function decodeHtml(html: string) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }
  return (
    <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
      <Image
        alt={gameData?.details.name}
        src={gameData?.details.capsule_images[0]}
        width={159}
        height={60}
        className="rounded-md mb-4"
      />
      <div className="flex flex-row justify-between items-end mb-3">
        <h2 className="text-theme-sm capitalize font-bold">
          {decodeHtml(gameData?.details.name.toLowerCase())}
        </h2>
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
            .map((achievement: any) => (
              <Tooltip.Provider key={achievement.name} delayDuration={0}>
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
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
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
                          {achievement.description ?? 'Hidden achievement'}
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
            ))}
      </ul>
      {gameData?.achievements?.unlockedAchievements && (
        <p className="text-theme-xs mb-2">
          {`${gameData?.achievements?.unlockedAchievementCount} / ${gameData?.achievements?.maxAchievementCount}`}{' '}
          achievements unlocked
        </p>
      )}
      <Link
        className="text-theme-xs flex items-center justify-start gap-x-2 text-[rgba(0,195,255)] hover:text-[rgba(255,255,255,0.8)]"
        href={`https://store.steampowered.com/app/${gameData?.appid}/`}
        target="_blank"
      >
        Visit Steam store page <IconExternalPage className="w-3 h-3" />
      </Link>
    </div>
  )
}

export default SteamGameDetails
