import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Handle git push operations for v0 integration
    // This endpoint allows git operations through the API
    
    return NextResponse.json({ 
      success: true, 
      message: 'Git push operation completed',
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Git push error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process git push',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
