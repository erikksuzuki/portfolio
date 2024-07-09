import { NextRequest, NextResponse } from 'next/server'

import { getGameSchema } from './getGameSchema'
import { getPlayerGameAchievements } from './getPlayerGameAchievements'
import { getPlayerGameStats } from './getPlayerGameStats'
import { getGameDetails } from './getGameDetails'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const appid: any = searchParams.get('appid')

  const gameDetails: any = await getGameDetails(appid)
  const gameStats: any = await getPlayerGameStats(appid)
  const gameAchievements: any = await getPlayerGameAchievements(appid)
  const gameSchema: any = await getGameSchema(appid)

  // parse game details
  const genres = gameDetails[appid].data.genres.map(
    (genre: any) => genre.description
  )
  const backgrounds = [gameDetails[appid].data.background]
  gameDetails[appid].data.background_raw &&
    backgrounds.push(gameDetails[appid].data.background_raw)
  const details = {
    name: gameDetails[appid].data.name,
    release_date: new Date(gameDetails[appid].data.release_date.date),
    website: gameDetails[appid].data.website,
    genres,
    backgrounds,
    screenshots: gameDetails[appid].data.screenshots.map(
      (screenshot: any) => screenshot.path_full
    ),
  }

  // parse player stats for game
  const stats: any = {}
  gameStats.playerstats.stats.forEach((stat: any) => {
    const statSchema = gameSchema.game.availableGameStats.stats
    const statName = statSchema.filter(
      (statSchema: any) => statSchema.name === stat.name
    )[0].displayName
    stats[stat.name] = {
      description: statName,
      value: stat.value,
    }
  })

  // parse player achievements for game
  const maxAchievementCount = gameAchievements.playerstats.achievements.length
  const unlockedAchievementCount =
    gameAchievements.playerstats.achievements.filter(
      (achievement: any) => achievement.achieved === 1
    ).length
  const achievementData = gameAchievements.playerstats.achievements
    .filter((achievement: any) => achievement.achieved === 1)
    .sort((a: any, b: any) => (a.unlocktime > b.unlocktime ? -1 : 1))
  const achievementSchema = gameSchema.game.availableGameStats.achievements
  const achievements = achievementData.map((achievement: any) => {
    const achievementName = achievementSchema.filter(
      (achievementSchema: any) => achievementSchema.name === achievement.apiname
    )[0].displayName
    const description = achievementSchema.filter(
      (achievementSchema: any) => achievementSchema.name === achievement.apiname
    )[0].description
    const unlocktime = new Date(Number(achievement.unlocktime) * 1000)
    const icon = achievementSchema.filter(
      (achievementSchema: any) => achievementSchema.name === achievement.apiname
    )[0].icon
    const icongray = achievementSchema.filter(
      (achievementSchema: any) => achievementSchema.name === achievement.apiname
    )[0].icongray
    return {
      name: achievementName,
      description,
      unlocktime,
      icon,
      icongray,
    }
  })

  return NextResponse.json({
    details,
    stats,
    unlockedAchievementCount,
    maxAchievementCount,
    achievements,
  })
}
