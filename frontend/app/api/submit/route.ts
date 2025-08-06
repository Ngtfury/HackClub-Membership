import { NextRequest, NextResponse } from 'next/server'

interface FormSubmission {
  name: string
  email: string
  phone: string
  department: string
  year: string
  githubUrl: string
  linkedinUrl: string
  portfolio: string
  hasExperience: string
  isAvailable: string
  skills: string
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmission = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'department', 'year']
    const missingFields = requiredFields.filter(field => !body[field as keyof FormSubmission])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          missingFields 
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Integrate with external services
    
    console.log('Form submission received:', {
      ...body,
      submittedAt: new Date().toISOString()
    })
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        message: 'Form submitted successfully',
        submissionId: `sub_${Date.now()}`,
        status: 'received'
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error processing form submission:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process form submission'
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
