import IconSpotify from '@/assets/icons/common/SpotifyLogo'
import SpotifyPlayingNow from './PlayingNow'
import SpotifyTrackListing from './TrackListing'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
const SpotifyRecentTracks = ({ playingNow, recentTracks }: any) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  return (
    <article className="rounded-lg border border-[rgba(255,255,255,0.1)] px-4 py-7 bg-acryllic-black">
      <header className="flex items-center justify-between">
        <div>
          <label className="uppercase text-[#0f0] text-[10px] tracking-widest font-semibold">
            What I&apos;m Listening To
          </label>
          <h1 className="text-theme-heading-xs font-poppins mb-7">
            Recent Tracks
          </h1>
        </div>
        <IconSpotify className="w-[24px] h-[24px] text-[rgba(0,255,0,0.4)]" />
      </header>
      <ul className="w-full">
        {playingNow && <SpotifyPlayingNow data={playingNow} />}
        {recentTracks &&
          recentTracks
            .slice(0, playingNow ? 6 : 7)
            .map((track: any, index: number) => (
              <SpotifyTrackListing
                key={track.track.name + index}
                track={track}
                lastItem={playingNow ? index === 5 : index === 6}
              />
            ))}
      </ul>
    </article>
  )
}

export default SpotifyRecentTracks
