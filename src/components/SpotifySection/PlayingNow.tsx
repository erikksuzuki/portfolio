'use client'

import { useResponsive } from '@/hooks/useResponsive'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { truncateParagraph } from '@/utils/formatString'
import Image from 'next/image'
import Link from 'next/link'

const SpotifyPlayingNow = ({ data }: any) => {
  const { isAboveMd } = useResponsive('md')
  const attributions = data?.item.artists
    .map((artist: any) => artist.name)
    .join(', ')
  if (data) {
    return (
      <Link
        href={data.item.external_urls.spotify}
        target="_blank"
        className="w-full"
      >
        <li className="flex items-center justify-between w-full mb-3 pb-3 border-b border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-x-4">
            <div className="min-w-[36px] min-h-[36px] overflow-hidden rounded-sm border border-[rgba(255,255,255,0.2)]">
              <Image
                alt={data.item.album.name}
                src={data.item.album.images[0].url}
                height={36}
                width={36}
              />
            </div>
            <div>
              <p className="text-theme-sm">
                {truncateParagraph(data.item.name, isAboveMd ? 39 : 20, false)}
              </p>
              <p className="text-theme-xs opacity-[0.8]">{attributions}</p>
            </div>
          </div>
          <div className="text-right min-w-[100px]">
            {data.is_playing ? (
              <div className="ml-auto h-[17px] w-[42px] relative opacity-[0.7] mb-[2px]">
                {Array.from(Array(10).keys()).map((index: number) => (
                  <i key={index + 'audiobar'} className="spotify-audio-bar" />
                ))}
              </div>
            ) : (
              <p className="text-theme-xs opacity-[0.7] mb-[2px]">
                {formatMilliseconds(data.progress_ms)} /{' '}
                {formatMilliseconds(data.item.duration_ms)}
              </p>
            )}
            <p className="text-theme-xs opacity-[0.5]">
              {data.is_playing ? 'playing now' : 'paused'}
            </p>
          </div>
        </li>
      </Link>
    )
  } else return <span></span>
}

export default SpotifyPlayingNow
