const PetWalk = require("../models/PetWalk")
const { BadRequestError } = require("../errors")

const getWalk = async (req, res) => {
  const uuid = req.params.id
  if (!uuid) {
    throw new BadRequestError("Provide a uuid")
  }
  const petWalk = await PetWalk.findOne({ uuid })
  if (!petWalk) {
    throw new BadRequestError("Invalid uuid")
  }
  res.status(200).json({ petWalk })
}

module.exports = { getWalk }
