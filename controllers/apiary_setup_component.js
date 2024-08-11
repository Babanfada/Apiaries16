const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { apiary_setup_components: COMPONENTS } = require("../models");
const { Op, Sequelize } = require("sequelize");
// const moment = require("moment");
// const e = require("express");

const getAllComponents = async (req, res) => {
  const queryObject = {};
  const totalSetupComp = await COMPONENTS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    component_name: (value) => ({
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
    const options = ["price(NGN)", "stock"];
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
  const numOfPages = Math.ceil(totalSetupComp / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["price(NGN)", "DESC"]];
      break;
    case "low-high":
      sortList = [["price(NGN)", "ASC"]];
      break;
    case "high-stock":
      sortList = [["stock", "DESC"]];
      break;
    case "low-stock":
      sortList = [["stock", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const apiarySetupComp = await COMPONENTS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    apiarySetupComp,
    totalSetupComp,
    count: apiarySetupComp.length,
    numOfPages,
  });
};

const getSingleComp = async (req, res) => {
  const { component_id } = req.params;
  const componenent = await COMPONENTS.findOne({
    where: { component_id },
  });
  if (!componenent) {
    throw new NOT_FOUND(`There is no componenent with an id of ${component_id}`);
  }
  res.status(StatusCodes.OK).json({ componenent });
};

const createComp = async (req, res) => {
  const component = await COMPONENTS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ component, msg: "Successfully added a new component" });
};
const updateComponent = async (req, res) => {
  const { component_id } = req.params;
  const component = await COMPONENTS.findOne({ where: { component_id } });
  if (!component) {
    throw new NOT_FOUND(`There is no component with an id of ${component_id}`);
  }
  await COMPONENTS.update(req.body, {
    where: { component_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Component details updated successfully" });
};
const deleteComponent = async (req, res) => {
  const { component_id } = req.params;
  const component = await COMPONENTS.findOne({ where: { component_id } });
  if (!component) {
    throw new NOT_FOUND(`There is no component with an id of ${component_id}`);
  }
  await COMPONENTS.destroy({
    where: { component_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Component details with the id:${component_id} removed permanently`,
  });
};
module.exports = {
  getAllComponents,
  getSingleComp,
  createComp,
  updateComponent,
  deleteComponent,
};
