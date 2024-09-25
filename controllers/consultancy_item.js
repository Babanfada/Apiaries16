const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { consultancy_items: CONSULTANCY } = require("../models");
const { Op, Sequelize } = require("sequelize");
// const moment = require("moment");
// const e = require("express");

const getAllITEMS = async (req, res) => {
  const queryObject = {};
  const totalCitems = await CONSULTANCY.count();
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
    const options = ["price", "numOfTimesRendered"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      console.log(field, value);

      if (options.includes(field)) {
        queryObject[field] = {
          [Sequelize.Op[operator]]: Number(value),
        };
        // console.log(queryObject);
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalCitems / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["price", "DESC"]];
      break;
    case "low-high":
      sortList = [["price", "ASC"]];
      break;
    case "high-rendered":
      sortList = [["numOfTimesRendered", "DESC"]];
      break;
    case "low-rendered":
      sortList = [["numOfTimesRendered", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const consultancy_items = await CONSULTANCY.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    consultancy_items,
    totalCitems,
    count: consultancy_items.length,
    numOfPages,
  });
};

const getSingleItem = async (req, res) => {
  const { item_id } = req.params;
  const consultancy_item = await CONSULTANCY.findOne({
    where: { item_id },
  });
  if (!consultancy_item) {
    throw new NOT_FOUND(
      `There is no consultancy_item with an id of ${item_id}`
    );
  }
  res.status(StatusCodes.OK).json({ consultancy_item });
};

const createItem = async (req, res) => {
  const component = await CONSULTANCY.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ component, msg: "Successfully added a new item" });
};
const updateItem = async (req, res) => {
  const { item_id } = req.params;
  const item = await CONSULTANCY.findOne({ where: { item_id } });
  if (!item) {
    throw new NOT_FOUND(`There is no item with an id of ${item_id}`);
  }
  await CONSULTANCY.update(req.body, {
    where: { item_id },
  });
  res.status(StatusCodes.OK).json({ msg: "Item details updated successfully" });
};
const deleteItem = async (req, res) => {
  const { item_id } = req.params;
  const item = await CONSULTANCY.findOne({ where: { item_id } });
  if (!item) {
    throw new NOT_FOUND(`There is no item with an id of ${item_id}`);
  }
  await CONSULTANCY.destroy({
    where: { item_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Item details with the id:${item_id} removed permanently`,
  });
};
module.exports = {
  getAllITEMS,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
};
