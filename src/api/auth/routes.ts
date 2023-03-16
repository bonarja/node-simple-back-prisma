import { plainToInstance } from "class-transformer"
import { Router } from "express"
import { UserDto } from "../user/model"
import { AuthDto } from "./models"
import { AuthService } from "./services"

const router = Router()

router.post("/auth/login", (req, res) => {
  const authDto = plainToInstance(AuthDto, req.body, {
    excludeExtraneousValues: true,
  })
  AuthService.login(authDto).then((r) => res.json(r))
})
router.get("/auth/verify", (req, res) => {
  AuthService.verify(req).then((r) => res.json(r))
})

router.post("/auth/register", (req, res) => {
  const userDto = plainToInstance(UserDto, req.body, {
    excludeExtraneousValues: true,
  })
  AuthService.register(userDto).then((r) => res.json(r))
})

export { router as authRouter }
