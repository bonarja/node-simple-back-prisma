import express from "express";
import cors from "cors";
import { json, urlencoded } from "express";
import { notesRouter } from "./api/notes/router";


const PORT = 8080;
const app = express();

app.use(cors(), json(), urlencoded({ extended: true }))
app.use(notesRouter)
app.listen(PORT, () => {
    console.log(`Server is running in: http://localhost:${PORT}`)
})