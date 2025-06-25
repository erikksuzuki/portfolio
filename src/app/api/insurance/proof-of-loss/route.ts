import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

// Initialize OpenAI (assumes env var OPENAI_API_KEY)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  const { base64Image } = await req.json()
  if (!base64Image) {
    return NextResponse.json(
      { error: 'No base64Image provided' },
      { status: 400 }
    )
  }
  try {
    // Parse body as JSON

    if (!base64Image || typeof base64Image !== 'string') {
      return NextResponse.json(
        { error: 'No base64Image provided' },
        { status: 400 }
      )
    }

    enum Role {
      User = 'user',
      System = 'system',
      Assistant = 'assistant',
    }

    // Use GPT-4o or your preferred model
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: Role.User,
          content: [
            {
              type: 'text',
              text: `Get the data from this insurance form.`, // If form does not appear to be signed by a notary public (blank form field), set notaryPublicSignatureExists to false. If a particular data point seems to be missing, set it to null, "null", or false depending on the data type`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `${base64Image}`,
              },
            },
          ],
        },
      ] as ChatCompletionMessageParam[],
      // Add `response_format` here if you want to enforce a schema:
      // response_format: zodResponseFormat(insuranceClaimSchema, "proof_of_loss_data")
    })

    // Parse and return the result
    const message = chatCompletion.choices[0].message?.content
    if (!message) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      )
    }

    // Try to parse as JSON, otherwise just return the string
    let data
    try {
      data = JSON.parse(message)
    } catch (err) {
      data = message
    }

    const response = NextResponse.json({ data })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  } catch (error) {
    console.error('Error:', error)
    const response = NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }
}
