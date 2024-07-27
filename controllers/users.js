const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { users: Users } = require("../models");

const getAllUsers = async (req, res) => {
  const users = await Users.findAll({});
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  getAllUsers,
};
