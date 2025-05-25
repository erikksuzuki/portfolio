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
import * as Tooltip from '@radix-ui/react-tooltip'
import IconExternalPage from '@/assets/icons/common/IconExternalPage'

const SpotifyTrackListing = ({ track, lastItem }: any) => {
  const { isAboveMd } = useResponsive('md')
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const playedAt = new Date(track.played_at).getTime()

  const attributions = track?.track?.artists
    ? track.track.artists.map((artist: any) => artist.name).join(', ')
    : 'Unknown Artist'

  const listItem = (
    <li
      className={clsx('flex items-center justify-between w-full', {
        'border-b border-[rgba(255,255,255,0.1)] mb-2 pb-2': !lastItem,
      })}
    >
      <div className="flex items-center gap-x-4">
        <div className="min-w-[36px] min-h-[36px] overflow-hidden rounded-sm border border-[rgba(255,255,255,0.2)]">
          <Image
            alt={track.track.album.name}
            src={track.track.album.images[0].url}
            height={36}
            width={36}
          />
        </div>
        <div>
          <p className="text-theme-sm">
            {truncateParagraph(track.track.name, isAboveMd ? 39 : 26, false)}
          </p>
          <p className="text-theme-xs opacity-[0.8]">{attributions}</p>
        </div>
      </div>
      <div className="text-right min-w-[100px]">
        <p className="text-theme-xs opacity-[0.7] mb-[2px]">
          {formatAMPM(track.played_at)}
        </p>
        <p className="text-theme-xs opacity-[0.5]">
          {timeAgo.format(playedAt)}
        </p>
      </div>
    </li>
  )
  return (
    <Link
      href={track.track.external_urls.spotify}
      target="_blank"
      className="w-full"
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
                  <h2 className="text-theme-sm">View in Spotify</h2>
                  <IconExternalPage className="w-4 h-4" />
                </div>
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        listItem
      )}
    </Link>
  )
}

export default SpotifyTrackListing
