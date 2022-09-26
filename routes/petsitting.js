const express = require("express")
const router = express.Router()

const {
  newPetSitting,
  getPetSitting,
  addPetWalk,
} = require("../controllers/petsitting.js")

router.post("/newPetSitting", newPetSitting)
router.post("/addPetWalk", addPetWalk)
router.get("/petSitting", getPetSitting)

module.exports = router
