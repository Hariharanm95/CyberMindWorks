import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all jobs
export async function GET() {
  const jobs = await prisma.job.findMany()
  return NextResponse.json(jobs)
}

// CREATE a new job
export async function POST(req: Request) {
  const {
    jobTitle,
    companyName,
    location,
    locationType,
    jobType,
    lackPerAnnum,
    experience,
    jobDescription,
    requirements,
    responsibilities,
    applicationDeadline,
  } = await req.json()

  const newJob = await prisma.job.create({
    data: {
      jobTitle,
      companyName,
      location,
      locationType,
      jobType,
      lackPerAnnum,
      experience,
      jobDescription,
      requirements,
      responsibilities,
      applicationDeadline: applicationDeadline
        ? new Date(applicationDeadline)
        : null, // ✅ null instead of undefined

    },
  })

  return NextResponse.json(newJob, { status: 201 })
}
