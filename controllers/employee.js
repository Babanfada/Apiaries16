const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { employees: Employees } = require("../models");

const getAllEmployees = async (req, res) => {
  const employees = await Employees.findAll({});
  res.status(StatusCodes.OK).json({ employees });
};

module.exports = {
  getAllEmployees,
};
