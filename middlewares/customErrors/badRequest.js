const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

class BAD_REQUEST extends CustomError {
  constructor(message) {
    this.message = message;
    this.statuscode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BAD_REQUEST;
