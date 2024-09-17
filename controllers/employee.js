const { NOT_FOUND, BAD_REQUEST } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const {
  employees: Employees,
  catch_reports: Reports,
  employee_nok: NOK,
  swarm_hunters: Hunters,
  apiary_stations: Apiary,
} = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const getAllEmployees = async (req, res) => {
  const queryObject = {};
  const totalEmployees = await Employees.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    first_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    last_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    email: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    role: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    emp_id: (value) => value,
    department: (value) => value,
    employment_status: (value) => {
      // If "All" is selected, include all rows regardless of 'employment_status'
      if (value === "---") {
        return { [Sequelize.Op.or]: ["active", "inactive", "terminated"] };
      }

      // If a specific status (not "---" and not undefined) is selected, filter by that status
      if (value !== "---" && value !== undefined) {
        return value; // Returns the selected employment status
      }

      // If undefined, skip adding this filter
      return undefined;
    },

    // employment_type: (value) => value,
    employment_type: (value) => {
      // If "---" is selected, include all rows regardless of 'employment_status'
      if (value === "---") {
        return {
          [Sequelize.Op.or]: [
            "full staff",
            "contract staff",
            "station supervisor(ext)",
          ],
        };
      }

      // If a specific status (not "---" and not undefined) is selected, filter by that status
      if (value !== "---" && value !== undefined) {
        return value; // Returns the selected employment status
      }

      // If undefined, skip adding this filter
      return undefined;
    },

    // employment_status: (value) => value,
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
    const options = ["salary", "dob", "joining_date"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      // console.log(field);

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
        // console.log(queryObject);
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
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
  const employeesGenderCount = await Employees.findAll({
    attributes: [
      "gender",
      [Sequelize.fn("COUNT", Sequelize.col("emp_id")), "count"],
    ],
    group: ["gender"],
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
    employeesGenderCount,
    departmentCount,
    employmentStatusCount,
    employmentTypeCount,
  });
};
const getSingleEmployee = async (req, res) => {
  const { emp_id } = req.params;
  const employee = await Employees.findOne({
    where: { emp_id },
    include: [
      {
        model: NOK,
        required: false,
        attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: Apiary,
        required: false,
        as: "internallySupervising",
        attributes: ["station_id", "station_name", "location"],
      },
      {
        model: Apiary,
        required: false,
        as: "externallySupervising",
        attributes: ["station_id", "station_name", "location"],
      },

      {
        model: Hunters,
        required: false,
        attributes: [
          "hunter_id",
          "fullname",
          "phone",
          "employment_status",
          "emergency_contact_name",
          "emergency_contact",
        ],
      },
      {
        model: Reports,
        required: false,
        attributes: ["report_id", "hunter_id", "catch_date", "catch_location"],
      },
    ],
  });
  if (!employee) {
    throw new NOT_FOUND(`There is no employee with an id of ${emp_id}`);
  }
  res.status(StatusCodes.OK).json({ employee });
};
const createEmployee = async (req, res) => {
  const employee = await Employees.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ employee, msg: "Successfully added an employee" });
};
const updateEmployee = async (req, res) => {
  const { emp_id } = req.params;
  const employee = await Employees.findOne({ where: { emp_id } });
  if (!employee) {
    throw new NOT_FOUND(`There is no employee with an id of ${emp_id}`);
  }
  await Employees.update(req.body, {
    where: { emp_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Employee details updated successfully" });
};
const deleteEmployee = async (req, res) => {
  const { emp_id } = req.params;
  const employee = await Employees.findOne({ where: { emp_id } });
  if (!employee) {
    throw new NOT_FOUND(`There is no employee with an id of ${emp_id}`);
  }
  await Employees.destroy({
    where: { emp_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Employee details with the id:${emp_id} removed permanently`,
  });
};
const uploadAvatar = async (req, res) => {
  const emp_img = req.files.image;
  const { emp_id } = req.params;
  //   console.log(emp_img);
  if (!emp_img.mimetype.startsWith("image")) {
    throw new BAD_REQUEST("please upload an image");
  }
  const maxSize = 2000 * 3000;
  if (emp_img.size > maxSize) {
    throw new BAD_REQUEST("uploaded files should not be more than 18mb");
  }
  const employee = await Employees.findOne({
    where: { emp_id },
  });
  if (!employee)
    throw new NOT_FOUND(
      `Employess with id ${emp_id} does not exist, create employee first !!! `
    );
  const currentPublicId = employee.img_public_id;
  if (currentPublicId) {
    await cloudinary.uploader.destroy(currentPublicId);
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Apiaries 16 employee's Images",
    }
  );
  //   console.log(result);
  employee.image = result.secure_url;
  employee.img_public_id = result.public_id;
  await employee.save();
  res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url,
    },
  });
  fs.unlinkSync(req.files.image.tempFilePath);
};
module.exports = {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadAvatar,
};
