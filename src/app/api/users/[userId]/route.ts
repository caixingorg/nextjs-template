import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { profileSchema } from "@/lib/validations/user"

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // 只允许用户更新自己的配置文件
    if (session.user.id !== params.userId) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const json = await req.json()
    const body = profileSchema.parse(json)

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: body.name,
        image: body.image,
      },
    })

    return NextResponse.json(user)
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