class CustomError extends Error {
  constructor() {
    super(message);
  }
}

module.exports = CustomError;
