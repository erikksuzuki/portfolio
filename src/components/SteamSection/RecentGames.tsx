import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import clsx from 'clsx'
import SteamGameListing from './GameListing'
import SpotifyLoadingSpinner from '../SpotifySection/LoadingSpinner'
import IconSteam from '@/assets/icons/common/SteamLogo'

const SteamRecentGames = ({ setGameData, recentlyPlayed }: any) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  return (
    <article className="rounded-lg border border-[rgba(255,255,255,0.1)] px-4 py-7 bg-acryllic-black">
      <header className="flex items-center justify-between">
        <div>
          <label className="uppercase text-[rgba(0,195,255)] text-[10px] tracking-widest font-semibold">
            What I&apos;ve Been Playing
          </label>
          <h1 className="text-theme-heading-xs font-poppins mb-7">
            Recent Games
          </h1>
        </div>
        <IconSteam className="w-[24px] h-[24px] text-[rgba(0,195,255,0.7)]" />
      </header>
      <ul
        className={clsx('w-full h-[376px] flex flex-col items-center', {
          'justify-center': !recentlyPlayed,
        })}
      >
        {recentlyPlayed &&
          recentlyPlayed.slice(0, 5).map((game: any, index: number) => {
            return (
              <SteamGameListing
                key={game.name + index}
                game={game}
                lastItem={index === 4}
                setGameData={setGameData}
              />
            )
          })}
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