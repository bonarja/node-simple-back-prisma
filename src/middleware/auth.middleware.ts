import { UserService } from "@/api/user/service"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import httpContext from "express-http-context"

export const authMiddeware: RequestHandler = async (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth) {
    return res.sendStatus(401)
  }

  const token: string = auth?.split(" ")[1] || ""
  const data = jwt.verify(token, process.env.BCRYPT_SECRET as string)
  const email = (data as { email: string })?.email
  if (!email) {
    return res.sendStatus(401)
  }
  const user = await UserService.findUserByEmail(email)
  if (user) {
    httpContext.set("authUser", user)
    next()
  }
  return res.sendStatus(401)
}
