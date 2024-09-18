const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { employee_nok: NOK } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllEmployeeNOK = async (req, res) => {
  const queryObject = {};
  const totalEmployeesNOK = await NOK.count();
  const { fields, sort } = req.query;
  const fieldsToCheck = {
    fullname: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    phone: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    email: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    emp_id: (value) => {
      if (Number(value) === 0) {
        // When value is 0, return all rows (no filter)
        return {
          [Sequelize.Op.ne]: null,
        };
      }
      if (value !== 0 && value !== undefined) {
        // When value is greater than 0, return the specified row
        return value;
      }
      return undefined; // No condition applied if value is undefined
    },
    gender: (value) => {
      // If "All" is selected, include all rows regardless of 'employment_status'
      if (value === "---") {
        return { [Sequelize.Op.or]: ["---", "male", "female"] };
      }

      // If a specific status (not "---" and not undefined) is selected, filter by that status
      if (value !== "---" && value !== undefined) {
        return value; // Returns the selected employment status
      }

      // If undefined, skip adding this filter
      return undefined;
    },
    relationship: (value) => {
      // If "All" is selected, include all rows regardless of 'employment_status'
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["---", "spouse", "parent", "guardian", "sibling"],
        };
      }

      // If a specific status (not "---" and not undefined) is selected, filter by that status
      if (value !== "---" && value !== undefined) {
        return value; // Returns the selected employment status
      }

      // If undefined, skip adding this filter
      return undefined;
    },
  };

  Object.keys(req.query).forEach((key) => {
    if (fieldsToCheck[key]) {
      queryObject[key] = fieldsToCheck[key](req.query[key]);
    }
  });

  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalEmployeesNOK / limit);
  let sortList;
  switch (sort) {
    case "Z-A":
      sortList = [["fullname", "DESC"]];
      break;
    case "A-Z":
      sortList = [["fullname", "ASC"]];
      break;
    case "male":
      sortList = [["gender", "ASC"]];
      break;
    case "female":
      sortList = [["gender", "DESC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const employeesNOK = await NOK.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  const relationshipTypeCount = await NOK.findAll({
    attributes: [
      "relationship",
      [Sequelize.fn("COUNT", Sequelize.col("nok_id")), "count"],
    ],
    group: ["relationship"],
  });
  const genderTypeCount = await NOK.findAll({
    attributes: [
      "gender",
      [Sequelize.fn("COUNT", Sequelize.col("nok_id")), "count"],
    ],
    group: ["gender"],
  });
  res.status(StatusCodes.OK).json({
    employeesNOK,
    totalEmployeesNOK,
    count: employeesNOK.length,
    relationshipTypeCount,
    genderTypeCount,
    numOfPages,
  });
};

const getSingleNOK = async (req, res) => {
  const { nok_id } = req.params;
  const nok = await NOK.findOne({
    where: { nok_id },
  });
  if (!nok) {
    throw new NOT_FOUND(`There is no nok with an id of ${nok_id}`);
  }
  res.status(StatusCodes.OK).json({ nok });
};
const createNOK = async (req, res) => {
  const nok = await NOK.create({ ...req.body });
  res.status(StatusCodes.OK).json({ nok, msg: "nok successfully created" });
};
const updateNOK = async (req, res) => {
  const { nok_id } = req.params;
  const nok = await NOK.findOne({ where: { nok_id } });
  if (!nok) {
    throw new NOT_FOUND(`There is no nok with an id of ${nok_id}`);
  }
  await NOK.update(req.body, {
    where: { nok_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Harvest details updated successfully" });
};
const deleteNOK = async (req, res) => {
  const { nok_id } = req.params;
  const nok = await NOK.findOne({ where: { nok_id } });
  if (!nok) {
    throw new NOT_FOUND(`There is no nok with an id of ${nok_id}`);
  }
  await NOK.destroy({
    where: { nok_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Station details with the id:${nok_id} removed permanently`,
  });
};
module.exports = {
  getAllEmployeeNOK,
  getSingleNOK,
  createNOK,
  updateNOK,
  deleteNOK,
};
