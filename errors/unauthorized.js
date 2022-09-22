const CustomApiError = require("./custom-api")

class Unauthorized extends CustomApiError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

module.exports = Unauthorized
