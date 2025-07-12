export const revalidate = 60

import { NextRequest, NextResponse } from 'next/server'
import { generateAppleJWT, AppleJWTConfig } from 'apple-jwt-generator'

// * Request data from Apple developer panel
// * Team ID shown in top right corner of dashboard
// * Client ID created in Identifiers -> Service IDs (dropdown menu
// * at the top right corner of Identifiers page)
// * Key ID created on Keys page and private key downloaded as p8 file

export async function GET(request: NextRequest) {
  const config: AppleJWTConfig = {
    teamId: '6G6TUVMB5V', // Your Apple Team ID
    keyId: 'placeholder_asdfasdfasdfsdf', // Your Key ID from Apple Developer Dashboard
    clientId: 'io.lovetrack.auth', // Your Service ID (Client ID)
    privateKey: `-----BEGIN PRIVATE KEY-----
placeholder_from_p8_file_asdfasdfasdfasdf
-----END PRIVATE KEY-----`,
  }

  const jwt = generateAppleJWT(config)
  console.log('jwt', jwt)

  const data = {
    jwt,
  }

  return NextResponse.json({ data }, { status: 200 })
}
