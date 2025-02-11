// src/app/api/version/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Get version from package.json
  const version = process.env.npm_package_version || '1.0.0'
  
  return NextResponse.json({ version })
}