import { hash, compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { LoginData, RegisterData } from "@/lib/validations/auth"

export class AuthService {
  // 验证用户凭证
  static async validateCredentials({ email, password }: LoginData) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.password) {
      throw new Error("No user found")
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new Error("Invalid password")
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }

  // 注册新用户
  static async register({ email, password, name }: RegisterData) {
    const exists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (exists) {
      throw new Error("User already exists")
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}