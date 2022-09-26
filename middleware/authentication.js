const jwt = require("jsonwebtoken")
const { Unauthorized } = require("../errors")

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("Invalid authentication")
  }

  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new Unauthorized("Invalid authentication")
  }
}

module.exports = auth
