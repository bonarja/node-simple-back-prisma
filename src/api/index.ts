import { authMiddeware } from "@/middleware/auth.middleware"
import { Application } from "express-serve-static-core"
import { authRouter } from "./auth/routes"
import { notesRouter } from "./notes/router"
import { userRouter } from "./user/routes"

export const setRoutes = (app: Application) => {
  app.use("/api", authRouter)
  app.use("/api", authMiddeware, notesRouter)
  app.use("/api", authMiddeware, userRouter)
}
