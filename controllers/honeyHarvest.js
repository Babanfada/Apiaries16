const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { honey_harvest: Harvest } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllHarvest = async (req, res) => {
  const queryObject = {};
  const totalHarvestQuantity = await Harvest.sum("quantity_collected");
  const totalHarvest = await Harvest.count();
  const { numberFilter, fields, sort } = req.query;
  const fieldsToCheck = {
    station_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    colouration: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    station_id: (value) => value,
    harvest_id: (value) => value,
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
    const options = [
      "harvest_year",
      "harvest_date",
      "quantity_collected",
      "quality_rating",
    ];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "harvest_date") {
          const dateValue = moment(value, "YYYY-MM-DD", true);
          if (dateValue.isValid()) {
            queryObject[field] = {
              [Sequelize.Op[operator]]: dateValue.toISOString(),
            };
          } else {
            queryObject[field] = {
              [Sequelize.Op[operator]]: Number(value),
            };
          }
        }
      }
    });
  }
  console.log(queryObject);
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalHarvest / limit);
  console.log(numOfPages);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["quality_rating", "DESC"]];
      break;
    case "low-high":
      sortList = [["quality_rating", "ASC"]];
      break;
    case "highest_Volume":
      sortList = [["quantity_collected", "ASC"]];
      break;
    case "lowest_volume":
      sortList = [["quantity_collected", "DESC"]];
      break;
    case "latest":
      sortList = [["harvest_year", "ASC"]];
      break;
    case "oldest":
      sortList = [["harvest_year", "DESC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const harvest = await Harvest.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const harvestYearCount = await Harvest.findAll({
    attributes: [
      "harvest_year",
      [Sequelize.fn("COUNT", Sequelize.col("harvest_year")), "count"],
    ],
    group: ["harvest_year"],
  });
  const qualityRatingCount = await Harvest.findAll({
    attributes: [
      "quality_rating",
      [Sequelize.fn("COUNT", Sequelize.col("quality_rating")), "count"],
    ],
    group: ["quality_rating"],
  });
  res.status(StatusCodes.OK).json({
    harvest,
    totalHarvestQuantity,
    count: harvest.length,
    harvestYearCount,
    qualityRatingCount,
    numOfPages,
  });
};
const getSingleHarvest = async (req, res) => {
  const { harvest_id } = req.params;
  const harvest = await Harvest.findOne({
    where: { harvest_id },
  });
  if (!harvest) {
    throw new NOT_FOUND(`There is no harvest with an id of ${harvest_id}`);
  }
  res.status(StatusCodes.OK).json({ harvest });
};
const createHarvest = async (req, res) => {
  const harvest = await Harvest.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ harvest, msg: "harvest successfully created" });
};
const updateHarvest = async (req, res) => {
  const { harvest_id } = req.params;
  const harvest = await Harvest.findOne({ where: { harvest_id } });
  if (!harvest) {
    throw new NOT_FOUND(`There is no harvest with an id of ${harvest_id}`);
  }
  await Harvest.update(req.body, {
    where: { harvest_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Harvest details updated successfully" });
};
const deleteHarvest = async (req, res) => {
  const { harvest_id } = req.params;
  const harvest = await Harvest.findOne({ where: { harvest_id } });
  if (!harvest) {
    throw new NOT_FOUND(`There is no harvest with an id of ${harvest_id}`);
  }
  await Harvest.destroy({
    where: { harvest_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Station details with the id:${harvest_id} removed permanently`,
  });
};
module.exports = {
  getAllHarvest,
  getSingleHarvest,
  createHarvest,
  updateHarvest,
  deleteHarvest,
};
