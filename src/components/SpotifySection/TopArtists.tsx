const TopArtistsList = ({ data }: any) => {
  return (
    <ul className="grid grid-cols-2 gap-x-4 text-theme-sm">
      {data.slice(0, 28).map((artist: any, index: number) => {
        return (
          <li
            key={artist.name + index + 'list'}
            className="flex items-center gap-2 mb-1"
          >
            <div
              style={{
                backgroundImage: `url(${artist.images[1].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
              className="rounded-full inline-block w-[16px] h-[16px] border border-[rgba(255,255,255,0.3)]"
            />
            <span className=" bg-acryllic-black opacity-[0.75]">
              {artist.name}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default TopArtistsList
