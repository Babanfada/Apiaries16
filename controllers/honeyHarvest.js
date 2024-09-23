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
    station_id: (value) => {
      if (Number(value) === 1) {
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
    harvest_year: (value) => {
      if (Number(value) === 2000) {
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
    const options = ["harvest_date", "quantity_collected", "quality_rating"];
    console.log(filter);
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "harvest_date") {
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
    console.log(queryObject, "here");
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalHarvest / limit);
  //   console.log(numOfPages);
  let sortList;
  switch (sort) {
    case "high-rating":
      sortList = [["quality_rating", "DESC"]];
      break;
    case "low-rating":
      sortList = [["quality_rating", "ASC"]];
      break;
    case "low_Volume":
      sortList = [["quantity_collected", "ASC"]];
      break;
    case "high-volume":
      sortList = [["quantity_collected", "DESC"]];
      break;
    case "latest-harvest":
      sortList = [["harvest_year", "ASC"]];
      break;
    case "oldest-harvest":
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

  const harvestedVolumeByYear = await Harvest.findAll({
    attributes: [
      "harvest_year",
      [
        Sequelize.fn("SUM", Sequelize.col("quantity_collected")),
        "harvested_volume",
      ],
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
    harvestedVolumeByYear,
    qualityRatingCount,
    numOfPages,
    totalHarvest,
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
