import { getUserFromContext } from "@/utils/getUserFromContext"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const router = Router()

router.post("/notes", (req, res) => {
  const prisma = new PrismaClient()
  const user = getUserFromContext()
  const { title, description } = req.body
  prisma.notes
    .create({
      data: {
        description,
        title,
        createAt: new Date(),
        users: {
          connect: {
            id: user?.id ?? 0
          }
        }
      },
    })
    .then((newNote) => {
      res.json(newNote)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get("/notes", (_, res) => {
  const prisma = new PrismaClient()
  const user = getUserFromContext()
  prisma.notes
    .findMany({ where: { user_id: user?.id } })
    .then((todoList) => {
      res.json(todoList)
    })
    .catch((err) => res.status(500).json(err))
})

router.get("/notes/:id", (req, res) => {
  const { id } = req.params
  const prisma = new PrismaClient()
  const user = getUserFromContext()
  prisma.notes
    .findFirst({ where: { id: Number(id), user_id: user?.id } })
    .then((todo) => {
      res.json(todo)
    })
    .catch((err) => res.status(500).json(err))
})

router.delete("/notes/:id", (req, res) => {
  const { id } = req.params
  const prisma = new PrismaClient()
  const user = getUserFromContext()
  prisma.notes
    .deleteMany({ where: { id: Number(id), user_id: user?.id } })
    .then((todoDeleted) => {
      res.json(todoDeleted)
    })
    .catch((err) => res.status(500).json(err))
})

router.put("/notes/:id", (req, res) => {
  const { id } = req.params
  const { description, title } = req.body
  const user = getUserFromContext()
  const prisma = new PrismaClient()
  prisma.notes
    .updateMany({
      data: {
        title,
        description,
      },
      where: {
        id: Number(id),
        user_id: user?.id,
      },
    })
    .then((todoUpdated) => {
      res.json(todoUpdated)
    })
    .catch((err) => res.status(500).json(err))
})

export { router as notesRouter }
