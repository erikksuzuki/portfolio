'use client'

import { formatAMPM } from '@/utils/formatDateTime'
import Image from 'next/image'
import { useEffect } from 'react'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import clsx from 'clsx'
import { truncateParagraph } from '@/utils/formatString'
import { useResponsive } from '@/hooks/useResponsive'
import * as Tooltip from '@radix-ui/react-tooltip'
import IconChevonRight from '@/assets/icons/common/IconChevronRight'

const SteamGameListing = ({ setGameData, game, lastItem }: any) => {
  const { isAboveMd } = useResponsive('md')
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const playedAt = game?.rtime_last_played
    ? new Date(game.rtime_last_played).getTime()
    : new Date()

  const developers = game?.developers
    .map((developer: any) => developer)
    .slice(0, 2)
    .join(', ')

  const attributions = `${developers}`

  const listItem = (
    <li
      className={clsx('flex items-center justify-between w-full', {
        'border-b border-[rgba(255,255,255,0.1)] mb-2 pb-2': !lastItem,
      })}
    >
      <div className="flex items-center gap-x-4">
        <div className="min-w-[36px] min-h-[36px] overflow-hidden rounded-sm border border-[rgba(255,255,255,0.2)]">
          <Image
            alt={game?.images.img_icon_url}
            src={game?.images?.img_icon_url}
            height={36}
            width={36}
          />
        </div>
        <div>
          <p className="text-theme-sm capitalize">
            {truncateParagraph(
              game?.name.toLowerCase(),
              isAboveMd ? 39 : 27,
              false
            )}
          </p>
          <p className="text-theme-xs opacity-[0.8]">{attributions}</p>
        </div>
      </div>
      <div className="text-right min-w-[100px]">
        <p className="text-theme-xs opacity-[0.7] mb-[2px]">
          {formatAMPM(game?.rtime_last_played)}
        </p>
        <p className="text-theme-xs opacity-[0.5]">
          {timeAgo.format(playedAt)}
        </p>
      </div>
    </li>
  )

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() =>
        isAboveMd
          ? setGameData(game.appid)
          : window.open(
              `https://store.steampowered.com/app/${game?.appid}/`,
              '_newtab'
            )
      }
    >
      {isAboveMd ? (
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>{listItem}</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="TooltipContent"
                sideOffset={5}
                side="right"
              >
                <div className="flex flex-row justify-center items-center gap-x-2">
                  <h2 className="text-theme-sm">View game details</h2>
                  <IconChevonRight className="w-4 h-4" />
                </div>
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        listItem
      )}
    </div>
  )
}

export default SteamGameListing
