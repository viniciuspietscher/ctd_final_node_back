const { v4: uuidv4 } = require("uuid")
const PetSitting = require("../models/PetSitting")
const PetWalk = require("../models/PetWalk")
const { BadRequestError, Unauthorized } = require("../errors")

const newPetSitting = async (req, res) => {
  const {
    name,
    phone,
    email,
    address,
    startdate,
    enddate,
    numvisitsperday,
    pets,
  } = req.body
  if (
    !name ||
    !phone ||
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

const getPetSittingById = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequestError("Provide pet sitting id")
  }
  const petSittingEvent = await PetSitting.findById(req.params.id)
  if (!petSittingEvent) {
    throw new BadRequestError("Invalid Pet sitting id")
  }
  if (petSittingEvent.sitterId !== req.user.userId) {
    throw new Unauthorized("Invalid user")
  }
  res.status(200).json(petSittingEvent)
}

const addPetWalk = async (req, res) => {
  const { petSittingId } = req.body
  if (!petSittingId) {
    throw new BadRequestError("Provide pet sitting id")
  }

  const petSittingEvent = await PetSitting.findById(petSittingId)

  if (!petSittingEvent) {
    throw new BadRequestError("Invalid Pet sitting id")
  }

  if (!req.user.userId === petSittingEvent.sitterId) {
    throw new BadRequestError(
      "Current user does not match sitting event sitter"
    )
  }

  const uuid = uuidv4()
  const petWalkEvent = await PetWalk.create({
    ...req.body,
    uuid,
    petSittingEvent,
  })

  res.status(200).json({
    uuid: petWalkEvent.uuid,
  })
}

module.exports = { newPetSitting, getPetSitting, getPetSittingById, addPetWalk }
