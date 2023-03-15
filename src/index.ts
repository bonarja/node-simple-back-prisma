import express from "express"
import cors from "cors"
import { json, urlencoded } from "express"
import { setRoutes } from "./api"

const PORT = 8080
export const app = express()

app.use(cors(), json(), urlencoded({ extended: true }))
setRoutes(app)
app.listen(PORT, () => {
  console.log(`Server is running in: http://localhost:${PORT}`)
})
