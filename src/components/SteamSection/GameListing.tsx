'use client'

import { formatAMPM } from '@/utils/formatDateTime'
import Image from 'next/image'
import { useEffect } from 'react'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import clsx from 'clsx'
import Link from 'next/link'
import { truncateParagraph } from '@/utils/formatString'
import { useResponsive } from '@/hooks/useResponsive'

const SteamGameListing = ({ game, lastItem }: any) => {
  const { isAboveMd } = useResponsive('md')
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const playedAt = new Date(game.rtime_last_played).getTime()

  const attributions = game.developers
    .map((developer: any) => developer)
    .join(', ')
  return (
    <Link href={'http://localhost:3000'} target="_blank" className="w-full">
      <li
        className={clsx('flex items-center justify-between w-full', {
          'border-b border-[rgba(255,255,255,0.1)] mb-2 pb-2': !lastItem,
        })}
      >
        <div className="flex items-center gap-x-4">
          <div className="min-w-[36px] min-h-[36px] overflow-hidden rounded-sm border border-[rgba(255,255,255,0.2)]">
            <Image
              alt={game.images.img_icon_url}
              src={game.images.img_icon_url}
              height={36}
              width={36}
            />
          </div>
          <div>
            <p className="text-theme-sm">
              {truncateParagraph(game.name, isAboveMd ? 39 : 26, false)}
            </p>
            <p className="text-theme-xs opacity-[0.8]">{attributions}</p>
          </div>
        </div>
        <div className="text-right min-w-[100px]">
          <p className="text-theme-xs opacity-[0.7] mb-[2px]">
            {formatAMPM(game.rtime_last_played)}
          </p>
          <p className="text-theme-xs opacity-[0.5]">
            {timeAgo.format(playedAt)}
          </p>
        </div>
      </li>
    </Link>
  )
}

export default SteamGameListing
