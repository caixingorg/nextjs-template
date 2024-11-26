import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const monitorMiddleware = (request: NextRequest) => {
  // 在这里添加监控逻辑
  return NextResponse.next()
}