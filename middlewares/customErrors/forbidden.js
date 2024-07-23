const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

class FORBIDDEN extends CustomError {
  constructor(message) {
    this.message = message;
    this.statuscode = StatusCodes.FORBIDDEN;
  }
}

module.exports = FORBIDDEN;
