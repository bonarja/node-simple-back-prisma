import httpContext from "express-http-context"
import { User } from "@/api/user/model"
import { plainToInstance } from "class-transformer"

export const getUserFromContext = (): User | null => {
  const authUser = httpContext.get("authUser")
  return authUser ? plainToInstance(User, authUser) : null
}
