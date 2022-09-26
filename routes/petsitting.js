const express = require("express")
const router = express.Router()

const { newPetSitting, getPetSitting } = require("../controllers/petsitting.js")

router.post("/newPetSitting", newPetSitting)
router.get("/petSitting", getPetSitting)

module.exports = router
