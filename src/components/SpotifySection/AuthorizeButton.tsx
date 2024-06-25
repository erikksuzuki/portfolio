const SpotifyAuthorizeButton = () => {
  return (
    <a
      href={`${'https://accounts.spotify.com/authorize'}?client_id=${
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
      }&scope=${process.env.NEXT_PUBLIC_SPOTIFY_SCOPE}&redirect_uri=${
        process.env.NEXT_PUBLIC_SITE_URL
      }&response_type=code`}
      target="_blank"
    >
      <button>Login and authorize user data</button>
    </a>
  )
}

export default SpotifyAuthorizeButton
