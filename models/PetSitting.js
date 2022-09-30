const mongoose = require("mongoose")
const PetSchema = require("./Pet")

const PetSittingSchema = new mongoose.Schema({
  sitterId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Provide a name"],
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  phone: {
    type: String,
    required: [true, "Provide a phone"],
    trim: true,
    minLength: 10,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Provide a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Provide a address"],
  },
  startdate: {
    type: Date,
    required: [true, "Provide a start date"],
  },
  enddate: {
    type: Date,
    required: [true, "Provide a end date"],
  },
  numvisitsperday: {
    type: Number,
    required: [true, "Provide a number of visits"],
  },
  pets: [
    {
      type: PetSchema,
    },
  ],
})

module.exports = mongoose.model("PetSitting", PetSittingSchema)
