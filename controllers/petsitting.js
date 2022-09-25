const PetSitting = require("../models/PetSitting")
const { BadRequestError, Unauthorized } = require("../errors")

const newPetSitting = async (req, res) => {
  const { name, email, address, startdate, enddate, numvisitsperday, pets } =
    req.body
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
  res.status(200).json({ msg: req.body })
}

module.exports = { newPetSitting }
