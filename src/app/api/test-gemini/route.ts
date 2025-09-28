import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Gemini API...')
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY)
    console.log('API Key prefix:', process.env.GEMINI_API_KEY?.substring(0, 10))

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not found in environment' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    // Try common model names that should work with the current API
    const modelNames = [
      'models/gemini-1.5-pro-latest',
      'models/gemini-1.5-flash-latest', 
      'models/gemini-1.0-pro-latest',
      'models/gemini-pro',
      'models/gemini-1.5-pro',
      'models/gemini-1.5-flash',
      'gemini-pro',
      'gemini-1.5-pro-latest'
    ]
    
    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}`)
        const model = genAI.getGenerativeModel({ model: modelName })
        
        const result = await model.generateContent('Say "Hello World" and nothing else.')
        const response = await result.response
        const text = response.text()
        
        console.log(`Model ${modelName} works! Response:`, text)
        
        return NextResponse.json({
          success: true,
          workingModel: modelName,
          response: text,
          message: 'Found working Gemini model'
        })
        
      } catch (modelError) {
        console.log(`Model ${modelName} failed:`, modelError instanceof Error ? modelError.message : modelError)
        continue
      }
    }
    
    throw new Error('No working model found')

  } catch (error) {
    console.error('Gemini test error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}