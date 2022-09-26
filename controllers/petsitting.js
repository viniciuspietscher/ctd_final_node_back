const PetSitting = require("../models/PetSitting")
const { BadRequestError } = require("../errors")

const newPetSitting = async (req, res) => {
  const { name, email, address, startdate, enddate, numvisitsperday, pets } =
    req.body
  // console.log(req.user.userId)
  if (
    !name ||
    !email ||
    !address ||
    !startdate ||
    !enddate ||
    !numvisitsperday ||
    !pets
  ) {
    throw new BadRequestError("missing body argument")
  }

  const petSittingEvent = await PetSitting.create({
    ...req.body,
    sitterId: req.user.userId,
  })
  res.status(201).json({ petsitting: petSittingEvent })
}

const getPetSitting = async (req, res) => {
  const petSittingEvent = await PetSitting.where({ sitterId: req.user.userId })

  // if (petSittingEvent.length === 0) {
  //   res.status(200).json({ msg: "No Pet Sitting event" })
  // }

  res.status(200).json({ petSittingEvent })
}

module.exports = { newPetSitting, getPetSitting }
