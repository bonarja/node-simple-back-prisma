import { HandlerReq } from "@/types/handlerReq"
import { Expose } from "class-transformer"
import { User } from "../user/model"

export class AuthDto {
  @Expose() email!: string
  @Expose() password!: string
}

type Auth = { user: User; token: string }

export interface AuthServiceIO {
  login: HandlerReq<AuthDto, Auth>
  verify: () => Promise<User | null>
}
