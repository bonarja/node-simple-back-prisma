// import { plainToInstance } from "class-transformer"
import { Router } from "express"
// import { UserDto } from "./model"
// import { UserService } from "./service"

const router = Router()

// router.post("/login", (req, res) => {
//   const userDto = plainToInstance(UserDto, req.body, {
//     excludeExtraneousValues: true,
//   })
//   UserService.createUser(userDto).then((r) => res.json(r))
// })

export { router as userRouter }
