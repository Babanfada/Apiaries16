const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const { users: USERS } = require("../models");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllUsers = async (req, res) => {
  const queryObject = {};
  console.log(queryObject);
  const totalUsers = await USERS.count();
  const { numberFilter, fields, sort } = req.query;

  //   const fieldsToCheck = {
  //     fullname: (value) => ({
  //       [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
  //     }),
  //     email: (value) => ({
  //       [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
  //     }),
  //     phone: (value) => value,
  //     gender: (value) => {
  //       if (value && value !== "All") return value === "male" ? "male" : "female";
  //       return undefined;
  //     },
  //     isVerified: (value) => {
  //       if (value && value !== "All") return value === "true" ? true : false;
  //       return null;
  //     },
  //     blacklisted: (value) => {
  //       if (value && value !== "All") return value === "true" ? true : false;
  //       // return "";
  //       return null;
  //     },
  //   };

  //   Object.keys(req.query).forEach((key) => {
  //     if (fieldsToCheck[key]) {
  //       queryObject[key] = fieldsToCheck[key](req.query[key]);
  //     }
  //   });

  const fieldsToCheck = {
    fullname: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    email: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    phone: (value) => value,
    gender: (value) => {
      console.log(value);
      if (value && value !== "All") return value;
      //   if (value && value !== "All") return value === "male" ? "male" : "female";
      return null; // Return null to skip adding this filter
    },
    isVerified: (value) => {
      if (value && value !== "All") return value === "true";
      return null; // Return null to skip adding this filter
    },
    blacklisted: (value) => {
      if (value && value !== "All") return value === "true";
      return null; // Return null to skip adding this filter
    },
  };

  Object.keys(req.query).forEach((key) => {
    if (fieldsToCheck[key]) {
      const fieldValue = fieldsToCheck[key](req.query[key]);
      if (fieldValue !== null) {
        queryObject[key] = fieldValue;
      }
    }
  });

  //   if (numberFilter) {
  //     const operatorMap = {
  //       ">": "gt",
  //       ">=": "gte",
  //       "=": "eq",
  //       "<": "lt",
  //       "<=": "lte",
  //     };
  //     const regEx = /(\b<=|>=|=|<|>|\b&lt;=|\b&gt;=|\b&lt;|\b&gt;|\b&le;)\b/g;
  //     let filter = numberFilter.replace(
  //       regEx,
  //       (match) => `/${operatorMap[match]}/`
  //     );
  //     // console.log(filter);
  //     const options = ["salary", "dob", "joining_date"];
  //     filter.split(" ").forEach((item) => {
  //       const [field, operator, value] = item.split("/");
  //       console.log(field);

  //       if (options.includes(field)) {
  //         if (field === "salary") {
  //           queryObject[field] = {
  //             [Sequelize.Op[operator]]: Number(value),
  //           };
  //         } else {
  //           const dateValue = moment(value, "YYYY-MM-DD", true);
  //           if (dateValue.isValid()) {
  //             queryObject[field] = {
  //               [Sequelize.Op[operator]]: dateValue.toDate(),
  //             };
  //           } else {
  //             console.error(`Invalid date format for ${field}: ${value}`);
  //           }
  //         }
  //         console.log(queryObject);
  //       }
  //     });
  //   }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalUsers / limit);
  let sortList;
  switch (sort) {
    case "male":
      sortList = [["male", "DESC"]];
      break;
    case "female":
      sortList = [["female", "ASC"]];
      break;
    case "A-Z":
      sortList = [["fullname", "ASC"]];
      break;
    case "Z-A":
      sortList = [["fullname", "DESC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const users = await USERS.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const genderCount = await USERS.findAll({
    attributes: [
      "gender",
      [Sequelize.fn("COUNT", Sequelize.col("user_id")), "count"],
    ],
    group: ["gender"],
  });

  const verificationCount = await USERS.findAll({
    attributes: [
      "isVerified",
      [Sequelize.fn("COUNT", Sequelize.col("user_id")), "count"],
    ],
    group: ["isVerified"],
  });

  res.status(StatusCodes.OK).json({
    users,
    totalUsers,
    count: users.length,
    numOfPages,
    genderCount,
    verificationCount,
  });
};
const getSingleUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await USERS.findOne({
    where: { user_id },
  });
  if (!user) {
    throw new NOT_FOUND(`There is no user with an id of ${user_id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
const createUser = async (req, res) => {
  const user = await USERS.create({ ...req.body });
  res.status(StatusCodes.OK).json({ user, msg: "Successfully added an user" });
};
const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await USERS.findOne({ where: { user_id } });
  if (!user) {
    throw new NOT_FOUND(`There is no user with an id of ${user_id}`);
  }
  await USERS.update(req.body, {
    where: { user_id },
  });
  res.status(StatusCodes.OK).json({ msg: "User details updated successfully" });
};
const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await USERS.findOne({ where: { user_id } });
  if (!user) {
    throw new NOT_FOUND(`There is no user with an id of ${user_id}`);
  }
  await USERS.destroy({
    where: { user_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `User details with the id:${user_id} removed permanently`,
  });
};
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
