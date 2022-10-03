require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./database/connect")
const errorHandlerMiddleware = require("./middleware/error-handler")
const authenticateUser = require("./middleware/authentication")
const PORT = process.env.PORT || 5000

app.use(cors())
// routers
const userRouter = require("./routes/user")
const petSittingRouter = require("./routes/petsitting")
// Customer
const customerRouter = require("./routes/customer")

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" })
})

app.use("/api/v1/user", userRouter)
app.options("*", cors())
app.use("/api/v1/petsitting", authenticateUser, petSittingRouter)
app.use("/api/v1/customer", customerRouter)

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
