const { CustomApiError } = require("../errors")
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ err })
}

module.exports = errorHandlerMiddleware
