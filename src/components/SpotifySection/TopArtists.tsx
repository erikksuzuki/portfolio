import Link from 'next/link'

const TopArtistsList = ({ data }: any) => {
  function randomNumber() {
    return Math.floor(Math.random() * 150) + 30
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 md:gap-x-8 text-theme-sm">
      {!data.length &&
        Array.from(Array(28).keys()).map((index: number) => (
          <p
            key={index + 'artistskeleton'}
            className="rounded-md bg-[rgba(255,255,255,0.05)] mb-1"
            style={{ width: `${randomNumber()}px` }}
          >
            &nbsp;
          </p>
        ))}
      {data.slice(0, 28).map((artist: any, index: number) => {
        return (
          <Link
            key={artist.name + index + 'list'}
            href={artist.external_urls.spotify}
            target="_blank"
          >
            <li className="flex items-center gap-2 mb-1">
              <div
                style={{
                  backgroundImage: `url(${artist.images[1].url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
                className="rounded-full inline-block w-[16px] h-[16px] border border-[rgba(255,255,255,0.3)]"
              />
              <span className="opacity-[0.75]">{artist.name}</span>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}

export default TopArtistsList
