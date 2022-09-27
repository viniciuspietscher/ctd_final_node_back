const mongoose = require("mongoose")

const PetWalkSchema = new mongoose.Schema({
  petSittingEvent: {
    type: mongoose.Types.ObjectId,
    ref: "PetSittingSchema",
  },
  date: {
    type: Date,
  },
  starttime: {
    type: Date,
  },
  endtime: {
    type: Date,
  },
  uuid: {
    type: String,
  },
  walknotes: {
    type: String,
  },
  pee: {
    type: Number,
  },
  poop: {
    type: Number,
  },
  food: {
    type: Boolean,
    default: false,
  },
  water: {
    type: Boolean,
    default: false,
  },
  medicine: {
    type: Boolean,
    default: false,
  },
  pictures: {
    type: [String],
  },
})

module.exports = mongoose.model("PetWalk", PetWalkSchema)
