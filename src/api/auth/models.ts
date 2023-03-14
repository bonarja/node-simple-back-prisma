import { HandlerReq } from "@/types/handlerReq";
import { User, UserDto } from "../user/model";


export interface AuthServiceIO {
  createUser: HandlerReq<UserDto, User>;
  authorize: HandlerReq<UserDto, { user: User; token: string }>;
}
