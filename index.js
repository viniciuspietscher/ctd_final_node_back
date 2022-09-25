require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const db = require("./database/connect")
const errorHandlerMiddleware = require("./middleware/error-handler")
const PORT = process.env.PORT || 5000

// routers
const userRouter = require("./routes/user")
const petSittingRouter = require("./routes/petsitting")

app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("hello")
// })

app.use("/api/v1/user", userRouter)
app.use("/api/v1/petsitting", petSittingRouter)

app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    db(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
