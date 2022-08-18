require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("hello")
// })

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
