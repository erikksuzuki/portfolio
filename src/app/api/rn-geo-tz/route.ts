import type { NextApiRequest, NextApiResponse } from 'next'
import { find } from 'geo-tz'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon' })
  }

  const latitude = parseFloat(lat as string)
  const longitude = parseFloat(lon as string)

  try {
    const timezones = find(latitude, longitude) // returns an array
    return res.status(200).json({ timezone: timezones[0] })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to determine timezone' })
  }
}
