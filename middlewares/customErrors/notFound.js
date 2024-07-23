const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

class NOT_FOUND extends CustomError {
  constructor(message) {
    this.message = message;
    this.statuscode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NOT_FOUND;
