const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { pollination_services: POLSERVICES } = require("../models");
const { Op, Sequelize } = require("sequelize");
// const moment = require("moment");
// const e = require("express");

const getAllPolServices = async (req, res) => {
  const queryObject = {};
  const totalPolServices = await POLSERVICES.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    crop_type: (value) => ({
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
    const options = ["price", "rendered"];
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
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalPolServices / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["price", "DESC"]];
      break;
    case "low-high":
      sortList = [["price", "ASC"]];
      break;
    case "high-rendered":
      sortList = [["rendered", "DESC"]];
      break;
    case "low-rendered":
      sortList = [["rendered", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const polservices = await POLSERVICES.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    polservices,
    totalPolServices,
    count: polservices.length,
    numOfPages,
  });
};

const getSinglePolService = async (req, res) => {
  const { pol_service_id } = req.params;
  const pol_service = await POLSERVICES.findOne({
    where: { pol_service_id },
  });
  if (!pol_service) {
    throw new NOT_FOUND(
      `There is no pol_service with an id of ${pol_service_id}`
    );
  }
  res.status(StatusCodes.OK).json({ pol_service });
};

const createPolService = async (req, res) => {
  const component = await POLSERVICES.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ component, msg: "Successfully added a new pollination service" });
};
const updatePolService = async (req, res) => {
  const { pol_service_id } = req.params;
  const polservice = await POLSERVICES.findOne({ where: { pol_service_id } });
  if (!polservice) {
    throw new NOT_FOUND(`There is no pollination service with an id of ${pol_service_id}`);
  }
  await POLSERVICES.update(req.body, {
    where: { pol_service_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "pollination service details updated successfully" });
};
const deletePolService = async (req, res) => {
  const { pol_service_id } = req.params;
  const pol_service = await POLSERVICES.findOne({ where: { pol_service_id } });
  if (!pol_service) {
    throw new NOT_FOUND(`There is no pol_service with an id of ${pol_service_id}`);
  }
  await POLSERVICES.destroy({
    where: { pol_service_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Pollination service details with the id:${pol_service_id} removed permanently`,
  });
};
module.exports = {
  getAllPolServices,
  getSinglePolService,
  createPolService,
  updatePolService,
  deletePolService,
};
