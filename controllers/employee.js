const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { employees: Employees } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const getAllEmployees = async (req, res) => {
  const queryObject = {};
  const totalEmployees = await Employees.count({ where: queryObject });
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    first_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    last_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    emp_id: (value) => value,
    department: (value) => value,
    employment_type: (value) => value,
    employment_status: (value) => value,
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
    console.log(filter);
    const options = ["salary", "dob", "joining_date"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      console.log(field);

      if (options.includes(field)) {
        if (field === "salary") {
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
        console.log(queryObject);
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalEmployees / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["salary", "DESC"]];
      break;
    case "low-high":
      sortList = [["salary", "ASC"]];
      break;
    case "A-Z":
      sortList = [["first_name", "ASC"]];
      break;
    case "Z-A":
      sortList = [["first_name", "DESC"]];
      break;
    case "youngest":
      sortList = [["dob", "DESC"]];
      break;
    case "oldest":
      sortList = [["dob", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const employees = await Employees.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const departmentCount = await Employees.findAll({
    attributes: [
      "department",
      [Sequelize.fn("COUNT", Sequelize.col("emp_id")), "count"],
    ],
    group: ["department"],
  });

  const employmentStatusCount = await Employees.findAll({
    attributes: [
      "employment_status",
      [Sequelize.fn("COUNT", Sequelize.col("emp_id")), "count"],
    ],
    group: ["employment_status"],
  });

  const employmentTypeCount = await Employees.findAll({
    attributes: [
      "employment_type",
      [Sequelize.fn("COUNT", Sequelize.col("emp_id")), "count"],
    ],
    group: ["employment_type"],
  });
  const newHires = await Employees.findAll({
    where: {
      joining_date: {
        [Sequelize.Op.gte]: Sequelize.literal(
          "DATE_SUB(CURDATE(), INTERVAL 6 MONTH)"
        ),
      },
    },
    attributes: [
      "emp_id",
      "department",
      "joining_date",
      "salary",
      "employment_status",
      "employment_type",
      "skill",
    ],
  });
  const newHiresCount = await Employees.count({
    where: {
      joining_date: {
        [Sequelize.Op.gte]: Sequelize.literal(
          "DATE_SUB(CURDATE(), INTERVAL 6 MONTH)"
        ),
      },
    },
  });
  const salaryData = await Employees.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("emp_id")), "emp_count"],
      [Sequelize.fn("MAX", Sequelize.col("salary")), "max_salary"],
      [Sequelize.fn("MIN", Sequelize.col("salary")), "min_salary"],
      [Sequelize.fn("AVG", Sequelize.col("salary")), "avg_salary"],
    ],
  });
  res.status(StatusCodes.OK).json({
    employees,
    totalEmployees,
    count: employees.length,
    numOfPages,
    salaryData,
    newHires,
    newHiresCount,
    departmentCount,
    employmentStatusCount,
    employmentTypeCount,
  });
};

module.exports = {
  getAllEmployees,
};
