const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { supplies: SUPPLIES } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const getAllSupplies = async (req, res) => {
  const queryObject = {};
  const totalSUpplies = await SUPPLIES.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    supply_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    category: (value) => value,
    status: (value) => value,
    storage_location: (value) => value,
    supplier: (value) => value,
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
    const options = [
      "quantity",
      "purchase_cost",
      "minimum_stock_level",
      "purchase_date",
    ];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "purchase_date") {
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
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalSUpplies / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["purchase_cost", "DESC"]];
      break;
    case "low-high":
      sortList = [["purchase_cost", "ASC"]];
      break;
    case "high-stock":
      sortList = [["minimum_stock_level", "DESC"]];
      break;
    case "low-stock":
      sortList = [["minimum_stock_level", "ASC"]];
      break;
    case "A-Z":
      sortList = [["supply_name", "ASC"]];
      break;
    case "Z-A":
      sortList = [["supply_name", "DESC"]];
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
  const supply = await SUPPLIES.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const categoryCount = await SUPPLIES.findAll({
    attributes: [
      "category",
      [Sequelize.fn("COUNT", Sequelize.col("supply_id")), "count"],
    ],
    group: ["category"],
  });
  const statusCount = await SUPPLIES.findAll({
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("supply_id")), "count"],
    ],
    group: ["status"],
  });
  const storageLocationCount = await SUPPLIES.findAll({
    attributes: [
      "storage_location",
      [Sequelize.fn("COUNT", Sequelize.col("supply_id")), "count"],
    ],
    group: ["storage_location"],
  });

  res.status(StatusCodes.OK).json({
    supply,
    totalSUpplies,
    count: supply.length,
    numOfPages,
    categoryCount,
    storageLocationCount,
    statusCount,
  });
};
const getSingleSupply = async (req, res) => {
  const { supply_id } = req.params;
  const supply = await SUPPLIES.findOne({
    where: { supply_id },
  });
  if (!supply) {
    throw new NOT_FOUND(`There is no supply with an id of ${supply_id}`);
  }
  res.status(StatusCodes.OK).json({ supply });
};

const createSupply = async (req, res) => {
  const supply = await SUPPLIES.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ supply, msg: "Successfully added a new supply" });
};
const updateSupply = async (req, res) => {
  const { supply_id } = req.params;
  const supply = await SUPPLIES.findOne({ where: { supply_id } });
  if (!supply) {
    throw new NOT_FOUND(`There is no supply with an id of ${supply_id}`);
  }
  await SUPPLIES.update(req.body, {
    where: { supply_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Equipment details updated successfully" });
};
const deleteSupply = async (req, res) => {
  const { supply_id } = req.params;
  const supply = await SUPPLIES.findOne({ where: { supply_id } });
  if (!supply) {
    throw new NOT_FOUND(`There is no supply with an id of ${supply_id}`);
  }
  await SUPPLIES.destroy({
    where: { supply_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Supply details with the id:${supply_id} removed permanently`,
  });
};
module.exports = {
  getAllSupplies,
  getSingleSupply,
  createSupply,
  updateSupply,
  deleteSupply,
};
