const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { hives: HIVES } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllHives = async (req, res) => {
  const queryObject = {};
  const totalHives = await HIVES.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    hive_type: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["langstroth", "top bar", "local"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    colonized: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["pending", "confirmed", "installed"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    use_condition: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["need repair", "used", "new"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    status: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["unuse", "inuse", "empty"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    current_location: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["swarm field", "station", "warehouse"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
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
    const options = ["num_of_frames", "first_installation"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      //   console.log(field);

      if (options.includes(field)) {
        if (field === "num_of_frames") {
          queryObject[field] = {
            [Sequelize.Op[operator]]: Number(value),
          };
        } else {
          const dateValue = moment(value, "YYYY-MM-DD", true);
          if (dateValue.isValid()) {
            queryObject[field] = {
              [Sequelize.Op[operator]]: dateValue.toDate(),
            };
          } else {
            console.error(`Invalid date format for ${field}: ${value}`);
          }
        }
        // console.log(queryObject);
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalHives / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["num_of_frames", "DESC"]];
      break;
    case "low-high":
      sortList = [["num_of_frames", "ASC"]];
      break;
    case "recent":
      sortList = [["first_installation", "DESC"]];
      break;
    case "old":
      sortList = [["first_installation", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const hives = await HIVES.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const colonizationCount = await HIVES.findAll({
    attributes: [
      "colonized",
      [Sequelize.fn("COUNT", Sequelize.col("hive_id")), "count"],
    ],
    group: ["colonized"],
  });
  const hiveTypeCount = await HIVES.findAll({
    attributes: [
      "hive_type",
      [Sequelize.fn("COUNT", Sequelize.col("hive_id")), "count"],
    ],
    group: ["hive_type"],
  });
  const hiveStatusCount = await HIVES.findAll({
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("hive_id")), "count"],
    ],
    group: ["status"],
  });
  const hiveUseConditionCount = await HIVES.findAll({
    attributes: [
      "use_condition",
      [Sequelize.fn("COUNT", Sequelize.col("hive_id")), "count"],
    ],
    group: ["use_condition"],
  });
  const hiveCurrentLocationCount = await HIVES.findAll({
    attributes: [
      "current_location",
      [Sequelize.fn("COUNT", Sequelize.col("hive_id")), "count"],
    ],
    group: ["current_location"],
  });

  res.status(StatusCodes.OK).json({
    hives,
    totalHives,
    count: hives.length,
    numOfPages,
    colonizationCount,
    hiveCurrentLocationCount,
    hiveStatusCount,
    hiveTypeCount,
    hiveUseConditionCount,
  });
};
const getSingleHive = async (req, res) => {
  const { hive_id } = req.params;
  const hive = await HIVES.findOne({
    where: { hive_id },
  });
  if (!hive) {
    throw new NOT_FOUND(`There is no hive with an id of ${hive_id}`);
  }
  res.status(StatusCodes.OK).json({ hive });
};

const createHive = async (req, res) => {
  const hive = await HIVES.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ hive, msg: "Successfully added a new hive" });
};
const updateHive = async (req, res) => {
  const { hive_id } = req.params;
  const hive = await HIVES.findOne({ where: { hive_id } });
  if (!hive) {
    throw new NOT_FOUND(`There is no hive with an id of ${hive_id}`);
  }
  await HIVES.update(req.body, {
    where: { hive_id },
  });
  res.status(StatusCodes.OK).json({ msg: "Hive details updated successfully" });
};
const deleteHive = async (req, res) => {
  const { hive_id } = req.params;
  const hive = await HIVES.findOne({ where: { hive_id } });
  if (!hive) {
    throw new NOT_FOUND(`There is no hive with an id of ${hive_id}`);
  }
  await HIVES.destroy({
    where: { hive_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Hive details with the id:${hive_id} removed permanently`,
  });
};
module.exports = {
  getAllHives,
  getSingleHive,
  createHive,
  updateHive,
  deleteHive,
};
