import { NextRequest, NextResponse } from 'next/server'

import { getPlayerOwnedGames } from './getOwnedGames'
import { getPlayerRecentlyPlayed } from './getRecentlyPlayed'
import { getPlayerSummary } from './getPlayerSummary'
import { getGameDetails } from '../game-details/getGameDetails'

export async function GET() {
  const summary: any = await getPlayerSummary()
  const ownedGames: any = await getPlayerOwnedGames()

  // const recentlyPlayed: any = await getPlayerRecentlyPlayed()
  const recentlyPlayed = ownedGames.response.games
    .sort((a: any, b: any) => {
      if (a.rtime_last_played < b.rtime_last_played) return 1
      if (a.rtime_last_played > b.rtime_last_played) return -1
    })
    .slice(0, 10)

  async function getAllGameData() {
    const data = Promise.all(
      recentlyPlayed.map((game: any) => getGameDetails(game.appid))
    ).then((resolvedValues) => {
      return resolvedValues.map((resolvedGame: any) => {
        const genres = resolvedGame[
          Object.keys(resolvedGame)[0]
        ].data.genres.map((genre: any) => genre.description)
        return {
          name: resolvedGame[Object.keys(resolvedGame)[0]].data.name,
          appid: resolvedGame[Object.keys(resolvedGame)[0]].data.steam_appid,
          header_image:
            resolvedGame[Object.keys(resolvedGame)[0]].data.header_image,
          capsule_image:
            resolvedGame[Object.keys(resolvedGame)[0]].data.capsule_image,
          short_description:
            resolvedGame[Object.keys(resolvedGame)[0]].data.short_description,

          developers:
            resolvedGame[Object.keys(resolvedGame)[0]].data.developers,

          publishers:
            resolvedGame[Object.keys(resolvedGame)[0]].data.publishers,

          release_date:
            resolvedGame[Object.keys(resolvedGame)[0]].data.release_date.date,
          genres: genres,
        }
      })
    })
    return await data
  }
  const recentlyPlayedGameDetails = await getAllGameData()

  const recentlyPlayedGames = recentlyPlayed.map((game: any) => {
    return {
      appid: game.appid,
      name: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].name,
      short_description: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].short_description,

      developers: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].developers,

      publishers: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].publishers,

      rtime_last_played: new Date(
        Number(
          ownedGames.response.games.filter(
            (ownedGame: any) => ownedGame.appid === game.appid
          )[0].rtime_last_played
        ) * 1000
      ),
      // playtime_2weeks: game.playtime_2weeks ?? undefined,
      playtime_forever: game.playtime_forever ?? undefined,
      release_date: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].release_date,
      genres: recentlyPlayedGameDetails.filter(
        (recentGame: any) => recentGame.appid === game.appid
      )[0].genres,
      content_descriptorids: game.content_descriptorids,
      images: {
        img_icon_url: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        header_image: recentlyPlayedGameDetails.filter(
          (recentGame: any) => recentGame.appid === game.appid
        )[0].header_image,
        capsule_image: recentlyPlayedGameDetails.filter(
          (recentGame: any) => recentGame.appid === game.appid
        )[0].capsule_image,
      },
    }
  })

  const data = {
    name: summary.response.players[0].personaname,
    profileurl: summary.response.players[0].profileurl,
    friend_code: '1092140375',
    avatar: summary.response.players[0].avatar,
    personastate: summary.response.players[0].personastate,
    lastlogoff: new Date(Number(summary.response.players[0].lastlogoff * 1000)),
    games_owned: ownedGames.response.game_count,
    recently_played: recentlyPlayedGames,
  }

  return NextResponse.json({ data }, { status: 200 })
}
