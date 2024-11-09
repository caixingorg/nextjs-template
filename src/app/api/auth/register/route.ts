/**
 * Path: src/app/api/auth/register/route.ts
 * Purpose: Registration API endpoint
 */

import { NextResponse } from "next/server"
import { AuthService } from "@/lib/services/auth.service"
import { registerSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = registerSchema.parse(json)

    const user = await AuthService.register({
      email: body.email,
      password: body.password,
      name: body.name,
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}