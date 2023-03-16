import { HandlerReq } from "@/types/handlerReq"
import { Expose } from "class-transformer"
import { Request } from "express"
import { User, UserDto } from "../user/model"

export class AuthDto {
  @Expose() email!: string
  @Expose() password!: string
}

type Auth = { user: User; token: string }

export interface AuthServiceIO {
  login: HandlerReq<AuthDto, Auth>
  verify: HandlerReq<Request, Auth | null>
  register: HandlerReq<UserDto, Auth>
}
