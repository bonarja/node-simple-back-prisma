import { User, UserRepositoryIO, UserWithAuth } from "./model"
import { PrismaClient } from "@prisma/client"
import { instanceToInstance, plainToInstance } from "class-transformer"

export const UserRepository: UserRepositoryIO = {
  async createUser(user) {
    const prisma = new PrismaClient()
    const result = prisma.users.create({ data: instanceToInstance(user) })
    return plainToInstance(User, result)
  },
  async findUserByEmail(email) {
    const prisma = new PrismaClient()
    const result = prisma.users.findFirst({ where: { email } })
    return result
      ? plainToInstance(User, result, { excludeExtraneousValues: true })
      : null
  },
  async findUserByEmailWithPass(email) {
    const prisma = new PrismaClient()
    const result = prisma.users.findFirst({ where: { email } })
    return result
      ? plainToInstance(UserWithAuth, result, { excludeExtraneousValues: true })
      : null
  },
}
