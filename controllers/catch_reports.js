const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { catch_reports: REPORTS } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllReports = async (req, res) => {
  const queryObject = {};
  const totalReports = await REPORTS.count();
  const totalboxesAssigned = await REPORTS.sum("total_boxes_assigned");
  const totalColonized = await REPORTS.sum("colonized_boxes");
  const totalUnColonized = await REPORTS.sum("uncolonized_boxes");
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    season: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["dry", "rain"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }
      return undefined;
    },
    catch_status: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["all pending", "all successfull", "some pending"],
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
    const options = [
      "catch_date",
      "total_boxes_assigned",
      "colonized_boxes",
      "uncolonized_boxes",
    ];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "catch_date") {
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
  const numOfPages = Math.ceil(totalReports / limit);
  let sortList;
  switch (sort) {
    case "new":
      sortList = [["catch_date", "DESC"]];
      break;
    case "old":
      sortList = [["catch_date", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const reports = await REPORTS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    reports,
    totalReports,
    count: reports.length,
    numOfPages,
    totalboxesAssigned,
    totalColonized,
    totalUnColonized,
  });
};

const getSingleReport = async (req, res) => {
  const { report_id } = req.params;
  const report = await REPORTS.findOne({
    where: { report_id },
  });
  if (!report) {
    throw new NOT_FOUND(`There is no report with an id of ${report_id}`);
  }
  res.status(StatusCodes.OK).json({ report });
};

const createReport = async (req, res) => {
  const report = await REPORTS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ report, msg: "Successfully added a new report" });
};
const updateReport = async (req, res) => {
  const { report_id } = req.params;
  const report = await REPORTS.findOne({ where: { report_id } });
  if (!report) {
    throw new NOT_FOUND(`There is no report with an id of ${report_id}`);
  }
  await REPORTS.update(req.body, {
    where: { report_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Report details updated successfully" });
};
const deleteReport = async (req, res) => {
  const { report_id } = req.params;
  const report = await REPORTS.findOne({ where: { report_id } });
  if (!report) {
    throw new NOT_FOUND(`There is no report with an id of ${report_id}`);
  }
  await REPORTS.destroy({
    where: { report_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Report details with the id:${report_id} removed permanently`,
  });
};
module.exports = {
  getAllReports,
  getSingleReport,
  createReport,
  updateReport,
  deleteReport,
};
