const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  honey_harvest: Harvest,
  apiary_stations: Apiary,
} = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllStations = async (req, res) => {
  const queryObject = {};
  const totalStations = await Apiary.count();
  const { numberFilter, fields, sort } = req.query;
  const totalHives = await Apiary.sum("number_of_hive_boxes");
  const fieldsToCheck = {
    station_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    location: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    station_id: (value) => value,
    station_size: (value) => value,
    status: (value) => value,
    "supervisor(int)": (value) => value,
    "supervisor(ext)": (value) => value,
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
      "number_of_hive_boxes",
      "last_inspection_date",
      "next_inspection_date",
    ];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "number_of_hive_boxes") {
          queryObject[field] = {
            [Sequelize.Op[operator]]: Number(value),
          };
        } else {
          const dateValue = moment(value, "YYYY-MM-DD", true);
          if (dateValue.isValid()) {
            queryObject[field] = {
              [Sequelize.Op[operator]]: dateValue.toISOString(),
            };
          } else {
            console.error(`Invalid date format for ${field}: ${value}`);
          }
        }
      }
    });
  }
  console.log(queryObject);
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalStations / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["number_of_hive_boxes", "DESC"]];
      break;
    case "low-high":
      sortList = [["number_of_hive_boxes", "ASC"]];
      break;
    case "A-Z":
      sortList = [["station_name", "ASC"]];
      break;
    case "Z-A":
      sortList = [["station_name", "DESC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const stations = await Apiary.findAll({
    where: { ...queryObject },
    numOfPages,
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const stationSizeCount = await Apiary.findAll({
    attributes: [
      "station_size",
      [Sequelize.fn("COUNT", Sequelize.col("station_id")), "count"],
    ],
    group: ["station_size"],
  });
  const stationLocationCount = await Apiary.findAll({
    attributes: [
      "location",
      [Sequelize.fn("COUNT", Sequelize.col("station_id")), "count"],
    ],
    group: ["location"],
  });
  const stationStatusCount = await Apiary.findAll({
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("station_id")), "count"],
    ],
    group: ["status"],
  });
  res.status(StatusCodes.OK).json({
    stations,
    count: stations.length,
    totalStations,
    numOfPages,
    totalHives,
    stationSizeCount,
    stationLocationCount,
    stationStatusCount,
  });
};

const getSingleStation = async (req, res) => {
  const { station_id } = req.params;
  const station = await Apiary.findOne({
    where: { station_id },
    include: [
      {
        model: Harvest,
        required: false,
        attributes: [
          "harvest_year",
          "harvest_date",
          "quantity_collected",
          "unit",
          "quality_rating",
        ],
      },
    ],
  });
  if (!station) {
    throw new NOT_FOUND(`There is no station with an id of ${station_id}`);
  }
  res.status(StatusCodes.OK).json({ station });
};
const createStation = async (req, res) => {
  const station = await Apiary.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ station, msg: "station successfully created" });
};
const updateStation = async (req, res) => {
  const { station_id } = req.params;
  const station = await Apiary.findOne({ where: { station_id } });
  if (!station) {
    throw new NOT_FOUND(`There is no station with an id of ${station_id}`);
  }
  await Apiary.update(req.body, {
    where: { station_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Station details updated successfully" });
};
const deleteStation = async (req, res) => {
  const { station_id } = req.params;
  const station = await Apiary.findOne({ where: { station_id } });
  if (!station) {
    throw new NOT_FOUND(`There is no station with an id of ${station_id}`);
  }
  await Apiary.destroy({
    where: { station_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Station details with the id:${station_id} removed permanently`,
  });
};
module.exports = {
  getAllStations,
  getSingleStation,
  createStation,
  updateStation,
  deleteStation,
};
