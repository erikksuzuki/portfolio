import { NextRequest, NextResponse } from 'next/server'

import { getGameSchema } from './getGameSchema'
import { getPlayerGameAchievements } from './getPlayerGameAchievements'
import { getPlayerGameStats } from './getPlayerGameStats'
import { getGameDetails } from './getGameDetails'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const appid: any = searchParams.get('appid')

  // fetch original server data
  const gameDetails: any = await getGameDetails(appid)
  const gameStats: any = await getPlayerGameStats(appid)
  const gameAchievements: any = await getPlayerGameAchievements(appid)
  const gameSchema: any = await getGameSchema(appid)
  const backgrounds = [gameDetails[appid].data.background]
  const capsule_images = [gameDetails[appid].data.capsule_image]

  // create details object
  let details: any = {}
  // parse game details
  if (gameDetails && gameStats && gameAchievements && gameSchema) {
    const genres = gameDetails[appid].data.genres.map(
      (genre: any) => genre.description
    )
    // if additional backgrounds or capsule images exist, add them to array
    gameDetails[appid].data.background_raw &&
      backgrounds.push(gameDetails[appid].data.background_raw)
    gameDetails[appid].data.capsule_imagev5 &&
      capsule_images.push(gameDetails[appid].data.capsule_imagev5)
    // construct details object
    details = {
      name: gameDetails[appid].data.name,
      short_description: gameDetails[appid].data.short_description,
      release_date: new Date(gameDetails[appid].data.release_date.date),
      website: gameDetails[appid].data.website,
      developers: gameDetails[appid].data.developers,
      publishers: gameDetails[appid].data.publishers,
      genres,
      backgrounds,
      capsule_images,
      screenshots: gameDetails[appid].data.screenshots.map(
        (screenshot: any) => screenshot.path_full
      ),
    }
  }

  // parse player stats for game
  let stats: any = {}
  // if (
  //   gameDetails &&
  //   gameStats &&
  //   gameAchievements &&
  //   gameSchema.game.availableGameStats.stats
  // ) {
  //   gameStats?.playerstats?.stats
  //     ? gameStats.playerstats.stats.forEach((stat: any) => {
  //         const statSchema = gameSchema.game.availableGameStats.stats
  //         const statName = statSchema.filter(
  //           (statSchema: any) => statSchema.name === stat.name
  //         )[0].displayName
  //         stats[stat.name] = {
  //           description: statName,
  //           value: stat.value,
  //         }
  //       })
  //     : (stats = stats)
  // }

  // parse player achievements for game
  let achievements: any = {}
  if (
    gameDetails &&
    gameStats &&
    gameAchievements &&
    gameSchema &&
    gameAchievements.playerstats?.achievements
  ) {
    // get an array of all earned player achievements for the game
    const unlockedAchievements =
      gameAchievements.playerstats.achievements.filter(
        (achievement: any) => achievement.achieved === 1
      )
    // counts for earned vs possible achievements
    const unlockedAchievementCount = unlockedAchievements.length
    const maxAchievementCount = gameAchievements.playerstats.achievements.length
    // get and sort list of earned player achievements for the game
    const achievementData = unlockedAchievements.sort((a: any, b: any) =>
      a.unlocktime > b.unlocktime ? -1 : 1
    )
    // retrieve all available achievements for the game (schema object)
    const achievementSchema = gameSchema.game.availableGameStats.achievements
    // for each earned player achievement, scrape data from schema object
    const achievementArray = achievementData.map((achievement: any) => {
      const achievementName = achievementSchema.filter(
        (achievementSchema: any) =>
          achievementSchema.name === achievement.apiname
      )[0].name
      const achievementDisplayName = achievementSchema.filter(
        (achievementSchema: any) =>
          achievementSchema.name === achievement.apiname
      )[0].displayName
      const description = achievementSchema.filter(
        (achievementSchema: any) =>
          achievementSchema.name === achievement.apiname
      )[0].description
      const unlocktime = new Date(Number(achievement.unlocktime) * 1000)
      const icon = achievementSchema.filter(
        (achievementSchema: any) =>
          achievementSchema.name === achievement.apiname
      )[0].icon
      const icongray = achievementSchema.filter(
        (achievementSchema: any) =>
          achievementSchema.name === achievement.apiname
      )[0].icongray
      return {
        name: achievementName,
        display_name: achievementDisplayName,
        description,
        unlocktime,
        icon,
        icongray,
      }
    })
    achievements = {
      maxAchievementCount,
      unlockedAchievementCount,
      unlockedAchievements: achievementArray,
    }
  }

  const success: boolean =
    gameDetails && gameStats && gameAchievements && gameSchema ? true : false
  const error = !success
    ? appid
      ? 'Could not find appid on Steam'
      : 'Steam appid not provided as search parameter'
    : undefined

  return NextResponse.json(
    {
      success,
      error,
      appid: Number(appid),
      details,
      stats,
      achievements,
    },
    { status: !success ? (appid ? 404 : 400) : 200 }
  )
}
