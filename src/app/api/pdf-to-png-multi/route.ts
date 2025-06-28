import { Buffer } from 'buffer'

export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  var CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client')
  var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance
  var Apikey = defaultClient.authentications['Apikey']
  Apikey.apiKey = process.env.CLOUDMERSIVE_KEY

  try {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi()

    const formData = await request.formData()
    var inputFile = formData.get('file') as File

    var cloudMersiveError
    var cloudMersiveData
    var cloudMersiveResponse

    var callback = function (error: any, data: any, response: any) {
      if (error) {
        cloudMersiveError = error
        console.error(error)
      } else {
        cloudMersiveData = data
        cloudMersiveResponse = response
        console.log('API called successfully. Returned data: ' + data)
      }
    }

    apiInstance.convertDocumentPdfToPngArray(inputFile, callback)

    const response = NextResponse.json({
      sessionId: randomUUID(),
      response: cloudMersiveResponse,
      rawData: cloudMersiveData,
    })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (err: any) {
    const response = NextResponse.json({ error: err }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
