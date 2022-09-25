const mongoose = require("mongoose")

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide a name"],
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  petType: {
    type: String,
    enum: ["Dog", "Cat"],
    required: [true, "Provide a pet type"],
  },
  age: {
    type: Number,
    min: 0,
    max: 40,
  },
  medicine: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
})

module.exports = PetSchema
