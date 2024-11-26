import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const authMiddleware = (request: NextRequest) => {
  // 在这里添加认证逻辑
  return NextResponse.next()
}