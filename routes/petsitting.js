const express = require("express")
const router = express.Router()

const {
  newPetSitting,
  getPetSitting,
  getPetSittingById,
  addPetWalk,
} = require("../controllers/petsitting.js")

router.post("/newPetSitting", newPetSitting)
router.post("/addPetWalk", addPetWalk)
router.get("/petSitting", getPetSitting)
router.get("/petSitting/:id", getPetSittingById)

module.exports = router
