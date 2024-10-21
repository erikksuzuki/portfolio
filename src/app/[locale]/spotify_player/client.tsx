'use client'

import IconSpotify from '@/assets/icons/common/SpotifyLogo'
import SpotifyLoadingSpinner from '@/components/SpotifySection/LoadingSpinner'
import Image from 'next/image'
import Link from 'next/link'
import en from 'javascript-time-ago/locale/en'
import clsx from 'clsx'
import { PauseIcon } from '@heroicons/react/24/solid'
import {
  Heart,
  Shuffle,
  SkipStartFill,
  PlayFill,
  SkipEndFill,
  Repeat,
  Repeat1,
} from 'react-bootstrap-icons'

import { useEffect, useState } from 'react'
import {
  getSpotifyPlayingNow,
  getSpotifyRecentlyPlayed,
} from '@/app/authService'

import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { truncateParagraph } from '@/utils/formatString'
import { formatAMPM } from '@/utils/formatDateTime'
import TimeAgo from 'javascript-time-ago'

import { useResponsive } from '@/hooks/useResponsive'

import * as Slider from '@radix-ui/react-slider'

const SpotifyPlayingNow = ({ data }: any) => {
  const { isAboveMd } = useResponsive('md')
  const attributions = data?.item.artists
    .map((artist: any) => artist.name)
    .join(', ')

  if (data) {
    return (
      <li className="flex items-center justify-between w-full pb-8">
        <div className="flex items-center gap-x-10">
          <figure className="min-w-[196px] min-h-[196px] shadow-xl overflow-hidden rounded-sm border border-[rgba(255,255,255,0.2)]">
            <img
              alt={data.item.album.name}
              src={data.item.album.images[0].url}
              height={196}
              width={196}
            />
          </figure>
          <figcaption>
            <p className="text-theme-heading-md mb-4">
              {truncateParagraph(data.item.name, 44, false)}
            </p>
            <p className="text-theme-heading-xs opacity-[0.8]">
              {attributions}
            </p>
          </figcaption>
        </div>
      </li>
    )
  } else return <span></span>
}

const SpotifyTrackListing = ({ track, lastItem }: any) => {
  const { isAboveMd } = useResponsive('md')
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const playedAt = new Date(track.played_at).getTime()

  const attributions = track.track.artists
    .map((artist: any) => artist.name)
    .join(', ')

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
      {listItem}
    </Link>
  )
}

const SpotifyRecentTracks = ({ playingNow, recentTracks }: any) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  return (
    <article className="rounded-lg border border-[rgba(255,255,255,0.1)] px-8 py-7 bg-spotify-player">
      <header className="flex items-center justify-end gap-x-4">
        {playingNow?.is_playing ? (
          <div className="ml-auto h-[17px] w-[42px] relative opacity-[0.7] mb-[2px]">
            {Array.from(Array(10).keys()).map((index: number) => (
              <i key={index + 'audiobar'} className="spotify-audio-bar" />
            ))}
          </div>
        ) : (
          <span className="text-theme-lg opacity-[0.5]">paused</span>
        )}
        <IconSpotify className="w-[36px] h-[36px] text-[rgba(0,255,0,0.7)]" />
      </header>
      <article>
        {playingNow && <SpotifyPlayingNow data={playingNow} />}
        {/* recentTracks &&
          recentTracks
            .slice(0, playingNow ? 6 : 7)
            .map((track: any, index: number) => (
              <SpotifyTrackListing
                key={track.track.name + index}
                track={track}
                lastItem={playingNow ? index === 5 : index === 6}
              />
            )) */}
        {recentTracks?.length === 0 && (
          <div className="text-white flex flex-col justify-center items-center opacity-[0.4]">
            <SpotifyLoadingSpinner />
            <span className="text-theme-xs mt-4 mb-12">Loading...</span>
          </div>
        )}
      </article>
      <Slider.Root
        className="relative flex h-3 w-full mb-6 touch-none select-none items-center"
        defaultValue={[50]}
        max={100}
        step={1}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-[rgba(0,0,0,0.4)]">
          <Slider.Range className="absolute h-full rounded-full bg-white" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-3 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-[rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.7)] focus:shadow-[0_0_0_5px] focus:shadow-[rgba(0,0,0,0.4)] focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>
      <footer className="flex flex-row items-center justify-between">
        <div className="min-w-[100px]">
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px]">
            <Heart className="w-[22px] h-[22px]" />
          </div>
        </div>
        <nav className="flex flex-row items-center gap-x-4">
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px]">
            <Shuffle className="w-[22px] h-[22px]" />
          </div>
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px]">
            <SkipStartFill className="w-[30px] h-[30px]" />
          </div>
          <div className="flex items-center justify-center rounded-full h-[56px] w-[56px]">
            {playingNow?.is_playing ? (
              <PauseIcon className="w-[48px] h-[48px]" />
            ) : (
              <PlayFill className="w-[48px] h-[48px]" />
            )}
          </div>
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px]">
            <SkipEndFill className="w-[30px] h-[30px]" />
          </div>
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px]">
            <Repeat className="w-[22px] h-[22px]" />
          </div>
        </nav>
        <div className="text-right min-w-[100px]">
          <p className="text-theme-lg opacity-[0.5] mb-[2px]">
            {playingNow?.progress_ms
              ? formatMilliseconds(playingNow?.progress_ms)
              : '0:00'}{' '}
            /{' '}
            {playingNow?.progress_ms
              ? formatMilliseconds(playingNow?.item.duration_ms)
              : '0:00'}
          </p>
        </div>
      </footer>
    </article>
  )
}

const SpotifyClient = () => {
  const [recentTracks, setRecentTracks] = useState([])
  const [playingNow, setPlayingNow] = useState<any>()
  async function getAndSetSpotifyRealtime() {
    getSpotifyPlayingNow()?.then((data) => {
      setPlayingNow(data)
      console.log(data)
    })
  }
  async function getAndSetSpotifyPlaylist() {
    getSpotifyRecentlyPlayed(10)?.then((data) => setRecentTracks(data?.items))
  }

  useEffect(() => {
    getAndSetSpotifyPlaylist()
  }, [playingNow?.item?.name])

  useEffect(() => {
    getAndSetSpotifyRealtime()
  }, [])
  return (
    <div
      style={{
        backgroundImage: `url(${playingNow?.item?.album?.images[0]?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="bg-[#aaa]"
    >
      <SpotifyRecentTracks
        playingNow={playingNow}
        recentTracks={recentTracks}
      />
    </div>
  )
}

export default SpotifyClient
