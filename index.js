require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

// routers
const authRouter = require("./routes/auth")

app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("hello")
// })
app.use("/api/v1/auth", authRouter)

const start = async () => {
  try {
    // TODO check for DB connection before starting the server
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
