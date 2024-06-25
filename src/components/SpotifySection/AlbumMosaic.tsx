import AlbumCoverTile from './AlbumCoverTile'

const SpotifyAlbumMosaic = ({ topArtists }: any) => {
  return (
    <div className="w-[4320px] opacity-[0.25] absolute">
      <div className="h-[180px]">
        {[...topArtists.slice(0, 12), ...topArtists.slice(0, 12)].map(
          (artist: any, index: number) => (
            <AlbumCoverTile key={artist.name + index} artist={artist} />
          )
        )}
      </div>
      <div className="h-[180px]">
        {[...topArtists.slice(12, 24), ...topArtists.slice(12, 24)].map(
          (artist: any, index: number) => (
            <AlbumCoverTile key={artist.name + index} artist={artist} />
          )
        )}
      </div>
      <div className="h-[180px]">
        {[...topArtists.slice(24, 36), ...topArtists.slice(24, 36)].map(
          (artist: any, index: number) => (
            <AlbumCoverTile key={artist.name + index} artist={artist} />
          )
        )}
      </div>
      <div className="h-[180px]">
        {[...topArtists.slice(36, 48), ...topArtists.slice(36, 48)].map(
          (artist: any, index: number) => (
            <AlbumCoverTile key={artist.name + index} artist={artist} />
          )
        )}
      </div>
    </div>
  )
}

export default SpotifyAlbumMosaic
