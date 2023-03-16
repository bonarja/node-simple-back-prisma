import { UserService } from "@/api/user/service"
import { Request, RequestHandler } from "express"
import jwt from "jsonwebtoken"
import httpContext from "express-http-context"

export const getAuthEmailByRequest = (req: Request): string | null => {
  const auth = req.headers.authorization
  if (!auth) return null
  const token: string = auth?.split(" ")[1] || ""
  const data = jwt.verify(token, process.env.BCRYPT_SECRET as string)
  return (data as { email: string })?.email || null
}

export const authMiddeware: RequestHandler = async(req, res, next) => {
  const email = getAuthEmailByRequest(req)
  if (!email) return res.sendStatus(401)
  
  const user = await UserService.findUserByEmail(email)
  if (!user) return res.sendStatus(401)

  httpContext.set("authUser", user)
  next()
  return
}
