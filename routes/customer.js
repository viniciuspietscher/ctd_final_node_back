const express = require("express")
const router = express.Router()

const { getWalk } = require("../controllers/customers.js")

router.get("/walk/:id", getWalk)

module.exports = router
