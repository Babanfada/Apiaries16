const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  swarm_hunters: HUNTERS,
  catch_reports: REPORTS,
  hives: HIVES,
} = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllHunters = async (req, res) => {
  const queryObject = {};
  const totalHunters = await HUNTERS.count();
  const { numberFilter, fields, sort } = req.query;
  const fieldsToCheck = {
    fullname: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    emergency_contact_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    emergency_contact: (value) =>
      value !== undefined
        ? {
            [Sequelize.Op.like]: Sequelize.fn(
              "LOWER",
              `%${value.toLowerCase()}%`
            ),
          }
        : undefined,
    phone: (value) =>
      value !== undefined
        ? {
            [Sequelize.Op.like]: Sequelize.fn(
              "LOWER",
              `%${value.toLowerCase()}%`
            ),
          }
        : undefined,

    employment_status: (value) => {
      if (value === "---") {
        return { [Sequelize.Op.or]: ["active", "inactive", "terminated"] };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    assigned_supervisor: (value) => {
      if (Number(value) === 0) {
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
    // console.log(filter);
    const options = ["tip", "joining_date"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      //   console.log(field);

      if (options.includes(field)) {
        if (field === "tip") {
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
  const numOfPages = Math.ceil(totalHunters / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["tip", "DESC"]];
      break;
    case "low-high":
      sortList = [["tip", "ASC"]];
      break;
    case "A-Z":
      sortList = [["fullname", "ASC"]];
      break;
    case "Z-A":
      sortList = [["fullname", "DESC"]];
      break;
    case "newest":
      sortList = [["joining_date", "DESC"]];
      break;
    case "oldest":
      sortList = [["joining_date", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const hunters = await HUNTERS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const contractStatusCount = await HUNTERS.findAll({
    attributes: [
      "employment_status",
      [Sequelize.fn("COUNT", Sequelize.col("hunter_id")), "count"],
    ],
    group: ["employment_status"],
  });

  res.status(StatusCodes.OK).json({
    hunters,
    totalHunters,
    count: hunters.length,
    numOfPages,
    contractStatusCount,
  });
};
const getSingleHunter = async (req, res) => {
  const { hunter_id } = req.params;
  const hunter = await HUNTERS.findOne({
    where: { hunter_id },
    include: [
      {
        model: HIVES,
        required: false,
        attributes: [
          "colonized",
          "status",
          "current_location",
          "first_installation",
          "last_inspection_date",
        ],
      },
      {
        model: REPORTS,
        required: false,
        attributes: [
          "assigned_supervisor",
          "total_boxes_assigned",
          "colonized_boxes",
          "uncolonized_boxes",
          "date_assigned",
          "delivered_to_apiary",
        ],
      },
    ],
  });
  if (!hunter) {
    throw new NOT_FOUND(`There is no hunter with an id of ${hunter_id}`);
  }
  res.status(StatusCodes.OK).json({ hunter });
};

const createHunter = async (req, res) => {
  const employee = await HUNTERS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ employee, msg: "Successfully added a hunter" });
};
const updateHunter = async (req, res) => {
  const { hunter_id } = req.params;
  const hunter = await HUNTERS.findOne({ where: { hunter_id } });
  if (!hunter) {
    throw new NOT_FOUND(`There is no hunter with an id of ${hunter_id}`);
  }
  await HUNTERS.update(req.body, {
    where: { hunter_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Hunter details updated successfully" });
};
const deleteHunter = async (req, res) => {
  const { hunter_id } = req.params;
  const hunter = await HUNTERS.findOne({ where: { hunter_id } });
  if (!hunter) {
    throw new NOT_FOUND(`There is no hunter with an id of ${hunter_id}`);
  }
  await HUNTERS.destroy({
    where: { hunter_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Hunter details with the id:${hunter_id} removed permanently`,
  });
};
module.exports = {
  getAllHunters,
  getSingleHunter,
  createHunter,
  updateHunter,
  deleteHunter,
};
