'use client'

import { formatAMPM } from '@/utils/formatDateTime'
import Image from 'next/image'
import { useEffect } from 'react'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const TrackListing = ({ track }: any) => {
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const playedAt = new Date(track.played_at).getTime()

  const attributions = track.track.artists
    .map((artist: any) => artist.name)
    .join(', ')
  return (
    <li className="mb-3 flex items-center justify-between w-full">
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
          <p className="text-theme-sm">{track.track.name}</p>
          <p className="text-theme-xs opacity-[0.8]">{attributions}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-theme-sm opacity-[0.8]">
          {formatAMPM(track.played_at)}
        </p>
        <p className="text-theme-xs opacity-[0.6]">
          {timeAgo.format(playedAt)}
        </p>
      </div>
    </li>
  )
}

export default TrackListing
