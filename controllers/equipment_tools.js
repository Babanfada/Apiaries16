const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { equipments_tools: EQUIPMENTS } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllEquipments = async (req, res) => {
  const queryObject = {};
  const totalEquipments = await EQUIPMENTS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    tool_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    category: (value) => value,
    status: (value) => value,
    storage_location: (value) => value,
    supplier: (value) => value,
    currency: (value) => value,
    // retired: (value) => value,
    retired: (value) => {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
      return false; // Handle unexpected values if necessary
    },
  };

  Object.keys(req.query).forEach((key) => {
    if (fieldsToCheck[key]) {
      queryObject[key] = fieldsToCheck[key](req.query[key]);
    }
  });

  if (numberFilter) {
    const operatorMap = {
      ">": "gt",
      ">=": "gte",
      "=": "eq",
      "<": "lt",
      "<=": "lte",
    };
    const regEx = /(\b<=|>=|=|<|>|\b&lt;=|\b&gt;=|\b&lt;|\b&gt;|\b&le;)\b/g;
    let filter = numberFilter.replace(
      regEx,
      (match) => `/${operatorMap[match]}/`
    );
    // console.log(filter);
    const options = ["quantity", "purchase_cost", "last_maintanace_date"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "last_maintanace_date") {
          const dateValue = moment(value, "YYYY-MM-DD", true);
          if (dateValue.isValid()) {
            queryObject[field] = {
              [Sequelize.Op[operator]]: dateValue.toISOString(),
            };
          }
        } else {
          queryObject[field] = {
            [Sequelize.Op[operator]]: Number(value),
          };
        }
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalEquipments / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["purchase_cost", "DESC"]];
      break;
    case "low-high":
      sortList = [["purchase_cost", "ASC"]];
      break;
    case "A-Z":
      sortList = [["tool_name", "ASC"]];
      break;
    case "Z-A":
      sortList = [["tool_name", "DESC"]];
      break;
    case "recently":
      sortList = [["purchase_date", "DESC"]];
      break;
    case "old":
      sortList = [["purchase_date", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const equipment = await EQUIPMENTS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const categoryCount = await EQUIPMENTS.findAll({
    attributes: [
      "category",
      [Sequelize.fn("COUNT", Sequelize.col("tool_id")), "count"],
    ],
    group: ["category"],
  });
  const statusCount = await EQUIPMENTS.findAll({
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("tool_id")), "count"],
    ],
    group: ["status"],
  });
  const storageLocationCount = await EQUIPMENTS.findAll({
    attributes: [
      "storage_location",
      [Sequelize.fn("COUNT", Sequelize.col("tool_id")), "count"],
    ],
    group: ["storage_location"],
  });

  res.status(StatusCodes.OK).json({
    equipment,
    totalEquipments,
    count: equipment.length,
    numOfPages,
    categoryCount,
    storageLocationCount,
    statusCount,
  });
};
const getSingleEquipment = async (req, res) => {
  const { tool_id } = req.params;
  const equipment = await EQUIPMENTS.findOne({
    where: { tool_id },
  });
  if (!equipment) {
    throw new NOT_FOUND(`There is no equipment with an id of ${tool_id}`);
  }
  res.status(StatusCodes.OK).json({ equipment });
};

const createEquipment = async (req, res) => {
  const equipment = await EQUIPMENTS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ equipment, msg: "Successfully added a new equipment" });
};
const updateEquipment = async (req, res) => {
  const { tool_id } = req.params;
  const equipment = await EQUIPMENTS.findOne({ where: { tool_id } });
  if (!equipment) {
    throw new NOT_FOUND(`There is no equipment with an id of ${tool_id}`);
  }
  await EQUIPMENTS.update(req.body, {
    where: { tool_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Equipment details updated successfully" });
};
const deleteEquipment = async (req, res) => {
  const { tool_id } = req.params;
  const equipment = await EQUIPMENTS.findOne({ where: { tool_id } });
  if (!equipment) {
    throw new NOT_FOUND(`There is no equipment with an id of ${tool_id}`);
  }
  await EQUIPMENTS.destroy({
    where: { tool_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Equipment details with the id:${tool_id} removed permanently`,
  });
};
module.exports = {
  getAllEquipments,
  getSingleEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
