import { plainToInstance } from "class-transformer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../user/model"
import { AuthServiceIO } from "./models"
import { UserService } from "../user/service"
import { getAuthEmailByRequest } from "@/middleware/auth.middleware"

export const AuthService: AuthServiceIO = {
  async login(authDto) {
    try {
      const user = await UserService.findUserByEmailWithPass(
        authDto.email || ""
      )
      if (!user) throw "Invalid user or password"

      const isValid = await bcrypt.compare(authDto.password, user.password)
      if (!isValid) throw "Invalid user or password"

      const dataForToken = {
        email: user.email,
      }

      const token = jwt.sign(dataForToken, process.env.BCRYPT_SECRET as string)

      return {
        user: plainToInstance(User, user, {
          excludeExtraneousValues: true,
        }),
        token,
      }
    } catch (error) {
      throw error
    }
  },
  async verify(req) {
    const email = getAuthEmailByRequest(req)
    if (!email) return null
    const user = await UserService.findUserByEmail(email)
    if (!user) return null
    return {
      user,
      token: (req.headers.authorization || "").split(" ")[1] || "",
    }
  },
  async register(userDto) {
    try {
      const exist = await UserService.findUserByEmail(userDto.email)
      if (exist?.email) {
        throw "Exist User"
      }
      const newUser = await UserService.createUser(userDto)

      const dataForToken = {
        email: newUser.email,
      }

      const token = jwt.sign(dataForToken, process.env.BCRYPT_SECRET as string)
      return {
        user: newUser,
        token,
      }
    } catch (error) {
      throw error
    }
  },
}
