import { plainToInstance } from "class-transformer"
import { Router } from "express"
import { AuthDto } from "./models"
import { AuthService } from "./services"

const router = Router()

router.post("/auth/login", (req, res) => {
  const authDto = plainToInstance(AuthDto, req.body, {
    excludeExtraneousValues: true,
  })
  AuthService.login(authDto).then((r) => res.json(r))
})
router.get("/auth/verify", (_, res) => {
  AuthService.verify().then(r => res.json(r))
})

export { router as authRouter }
