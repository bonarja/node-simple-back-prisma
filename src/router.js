const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");

const router = Router();

router.post("/todo", (req, res) => {
  const prisma = new PrismaClient();
  const { title, description } = req.body;
  prisma.todo
    .create({
      data: {
        description,
        title,
        createAt: new Date(),
        done: false,
      },
    })
    .then((newNote) => {
      res.json(newNote);
    })
    .catch((err) => {
        res.status(500).json(err)
    });
});

router.get("/todo", (req, res) => {
  const prisma = new PrismaClient();
  prisma.todo
    .findMany()
    .then((todoList) => {
      res.json(todoList);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const prisma = new PrismaClient();
  prisma.todo
    .findFirst({ where: { id: Number(id) } })
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const prisma = new PrismaClient();
  prisma.todo
    .delete({ where: { id: Number(id) } })
    .then((todoDeleted) => {
      res.json(todoDeleted);
    })
    .catch((err) => res.status(500).json(err));
});

router.put("/todo/:id", (req, res) => {
    const { id } = req.params;
    const { description, title, done } = req.body;
    const prisma = new PrismaClient();
    prisma.todo
      .update({
        data: {
            title,
            description,
            done
        },
        where: {
            id: Number(id)
        }
      })
      .then((todoUpdated) => {
        res.json(todoUpdated);
      })
      .catch((err) => res.status(500).json(err));
});

module.exports.router = router;
