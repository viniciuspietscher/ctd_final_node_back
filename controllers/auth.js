const User = require("../models/User")
const { BadRequestError } = require("../errors")

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name) {
    throw new BadRequestError("Please provide a name")
  }
  if (!email) {
    throw new BadRequestError("Please provide a email")
  }
  if (!password) {
    throw new BadRequestError("Please provide a password")
  }
  // const user = await User.create({ ...req.body })
  // const token = user.createJWT()
  // res.status(201).json({ user: { name: user.name }, token })
  res.status(200).json({ msg: "user registered" })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }
  // res.status(200).json({ msg: "user logged in" })
}

module.exports = { register, login }
