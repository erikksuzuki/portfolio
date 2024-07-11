import IconSpotify from '@/assets/icons/common/SpotifyLogo'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import clsx from 'clsx'
import SteamGameListing from './GameListing'
import SpotifyLoadingSpinner from '../SpotifySection/LoadingSpinner'

const SteamRecentGames = ({ playingNow, recentlyPlayed }: any) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  return (
    <article className="rounded-lg border border-[rgba(255,255,255,0.1)] px-4 py-7 bg-acryllic-black">
      <header className="flex items-center justify-between">
        <div>
          <label className="uppercase text-[#0f0] text-[10px] tracking-widest font-semibold">
            What Games I&apos;m Playing
          </label>
          <h1 className="text-theme-heading-xs font-poppins mb-7">
            Recently Played
          </h1>
        </div>
        <IconSpotify className="w-[24px] h-[24px] text-[rgba(0,255,0,0.4)]" />
      </header>
      <ul
        className={clsx('w-full h-[376px] flex flex-col items-center', {
          'justify-center': !playingNow || !recentlyPlayed,
        })}
      >
        {recentlyPlayed &&
          recentlyPlayed
            .slice(0, 5)
            .map((game: any, index: number) => (
              <SteamGameListing
                key={game.name + index}
                track={game}
                lastItem={index === 4}
              />
            ))}
        {!recentlyPlayed && (
          <div className="text-white flex flex-col justify-center items-center opacity-[0.4]">
            <SpotifyLoadingSpinner />
            <span className="text-theme-xs mt-4 mb-12">Loading...</span>
          </div>
        )}
      </ul>
    </article>
  )
}

export default SteamRecentGames
