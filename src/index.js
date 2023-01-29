const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");
const { router } = require("./router");


const PORT = 8080;
const app = express();

app.use(cors(), json(), urlencoded({ extended: true }))
app.use(router)
app.listen(PORT, () => {
    console.log(`Server is running in: http://localhost:${PORT}`)
})