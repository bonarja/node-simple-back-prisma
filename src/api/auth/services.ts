import { plainToInstance } from "class-transformer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../user/model"
import { AuthServiceIO } from "./models"
import { UserService } from "../user/service"
import { getUserFromContext } from "@/utils/getUserFromContext"

export const AuthService: AuthServiceIO = {
  async login(UserDto) {
    try {
      const user = await UserService.findUserByEmailWithPass(UserDto.email || "")
      if (!user) throw "Invalid user or password"

      const isValid = await bcrypt.compare(UserDto.password, user.password)
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
  async verify() {
    return getUserFromContext();
  },
}
