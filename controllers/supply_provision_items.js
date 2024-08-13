const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { supply_provision_items: PROVISIONS } = require("../models");
const { Op, Sequelize } = require("sequelize");
// const moment = require("moment");
// const e = require("express");

const getAllProvisions = async (req, res) => {
  const queryObject = {};
  const totalProvisions = await PROVISIONS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    item_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
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
    const options = ["price_NGN", "quantity"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      console.log(field, value);

      if (options.includes(field)) {
        // if (field === "num_of_frames") {
        queryObject[field] = {
          [Sequelize.Op[operator]]: Number(value),
          //   };
          // } else {
          //   const dateValue = moment(value, "YYYY-MM-DD", true);
          //   if (dateValue.isValid()) {
          //     queryObject[field] = {
          //       [Sequelize.Op[operator]]: dateValue.toDate(),
          //     };
          //   } else {
          //     console.error(`Invalid date format for ${field}: ${value}`);
          //   }
        };
        // console.log(queryObject);
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalProvisions / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["price_NGN", "DESC"]];
      break;
    case "low-high":
      sortList = [["price_NGN", "ASC"]];
      break;
    case "high-quantity":
      sortList = [["quantity", "DESC"]];
      break;
    case "low-quantity":
      sortList = [["quantity", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const provisions = await PROVISIONS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    provisions,
    totalProvisions,
    count: provisions.length,
    numOfPages,
  });
};

const getSingleProvisions = async (req, res) => {
  const { item_id } = req.params;
  const provision = await PROVISIONS.findOne({
    where: { item_id },
  });
  if (!provision) {
    throw new NOT_FOUND(
      `There is no provision with an id of ${item_id}`
    );
  }
  res.status(StatusCodes.OK).json({ provision });
};

const createProvision = async (req, res) => {
  const provision = await PROVISIONS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ provision, msg: "Successfully added a new provision" });
};
const updateProvision = async (req, res) => {
  const { item_id } = req.params;
  const provision = await PROVISIONS.findOne({ where: { item_id } });
  if (!provision) {
    throw new NOT_FOUND(`There is no provision with an id of ${item_id}`);
  }
  await PROVISIONS.update(req.body, {
    where: { item_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Supply provision details updated successfully" });
};
const deleteProvision = async (req, res) => {
  const { item_id } = req.params;
  const provision = await PROVISIONS.findOne({ where: { item_id } });
  if (!provision) {
    throw new NOT_FOUND(`There is no provision with an id of ${item_id}`);
  }
  await PROVISIONS.destroy({
    where: { item_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Component details with the id:${item_id} removed permanently`,
  });
};
module.exports = {
  getAllProvisions,
  getSingleProvisions,
  createProvision,
  updateProvision,
  deleteProvision,
};
