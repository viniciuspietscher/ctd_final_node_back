const register = async (req, res) => {
  res.status(201).json({ msg: "user registered" })
}

const login = async (req, res) => {
  res.status(200).json({ msg: "user logged in" })
}

module.exports = { register, login }
