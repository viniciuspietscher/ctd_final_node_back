const { v4: uuidv4 } = require("uuid")
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

const addPetWalk = async (req, res) => {
  const {
    petSittingId,
    starttime,
    endtime,
    walknotes,
    pee,
    poop,
    food,
    water,
    medicine,
    pictures,
  } = req.body
  if (!petSittingId) {
    throw new BadRequestError("Provide pet sitting id")
  }

  const uuid = uuidv4()
  const petSittingEvent = await PetSitting.findByIdAndUpdate(
    req.body.petSittingId,
    {
      $push: {
        petWalk: {
          starttime,
          endtime,
          uuid: uuid,
          walknotes,
          pee,
          poop,
          food,
          water,
          medicine,
          pictures,
        },
      },
    }
  )
  if (!petSittingEvent) {
    throw new BadRequestError("Invalid Pet sitting id")
  }
  res.status(201).json({ petSittingEvent })
}

module.exports = { newPetSitting, getPetSitting, addPetWalk }
