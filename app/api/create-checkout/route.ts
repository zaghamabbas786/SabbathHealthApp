import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use relative URL - works in all environments (local, staging, production)
    return NextResponse.json({ 
      url: '/pricing',
      message: 'Redirect to pricing page'
    })
  } catch (error) {
    console.error('Error creating checkout:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

