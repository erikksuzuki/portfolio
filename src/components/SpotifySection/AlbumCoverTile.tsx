const AlbumCoverTile = ({ artist }: any) => {
  return (
    <div
      style={{
        backgroundImage: `url(${artist?.images[0]?.url ?? ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="inline-block w-[180px] h-[180px]"
      key={artist?.name}
    />
  )
}

export default AlbumCoverTile
