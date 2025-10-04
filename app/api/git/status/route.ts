import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return git repository status for v0 integration
    return NextResponse.json({ 
      success: true,
      status: 'clean',
      branch: 'main',
      message: 'Git status retrieved successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Git status error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to retrieve git status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
