const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide a name"],
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minLength: [8, "password must be at least 8 characters"],
    // Minimum 8 characters
    // At least 1 upper case English letter
    // At least 1 lower case English letter
    // At least 1 letter
    // At least 1 special character
    // match: [
    //   /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    //   "Provide a strong password",
    // ],
  },
})

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
}

UserSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password)
  return isMatch
}

module.exports = mongoose.model("User", UserSchema)
