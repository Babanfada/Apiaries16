const { NOT_FOUND } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  services: SERVICES,
  apiary_setup_components: COMPONENTS,
  consultancy_items: CITEMS,
  pollination_services: POLLINATION,
  supply_provision_items: PROVISION,
} = require("../models");

const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllServices = async (req, res) => {
  const queryObject = {};
  const totalServices = await SERVICES.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    service_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    category: (value) => value,
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
    const options = ["numOfTimesRendered"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      //   console.log(field);

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
  const numOfPages = Math.ceil(totalServices / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["numOfTimesRendered", "DESC"]];
      break;
    case "low-high":
      sortList = [["numOfTimesRendered", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const service = await SERVICES.findAll({
    where: { ...queryObject },
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    service,
    totalServices,
    count: service.length,
    numOfPages,
  });
};

const getSingleService = async (req, res) => {
  const { service_id } = req.params;
  const services = await SERVICES.findOne({
    where: { service_id },
    include: [
      {
        model: COMPONENTS,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: CITEMS,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: POLLINATION,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: PROVISION,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
    ],
  });
  if (!services) {
    throw new NOT_FOUND(`There is no services with an id of ${service_id}`);
  }
  res.status(StatusCodes.OK).json({ services });
};

const createService = async (req, res) => {
  const service = await SERVICES.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ service, msg: "Successfully added a new service" });
};
const updateService = async (req, res) => {
  const { service_id } = req.params;
  const service = await SERVICES.findOne({ where: { service_id } });
  if (!service) {
    throw new NOT_FOUND(`There is no service with an id of ${service_id}`);
  }
  await SERVICES.update(req.body, {
    where: { service_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Service details updated successfully" });
};
const deleteService = async (req, res) => {
  const { service_id } = req.params;
  const service = await SERVICES.findOne({ where: { service_id } });
  if (!service) {
    throw new NOT_FOUND(`There is no service with an id of ${service_id}`);
  }
  await SERVICES.destroy({
    where: { service_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Service details with the id:${service_id} removed permanently`,
  });
};
module.exports = {
  getAllServices,
  getSingleService,
  createService,
  updateService,
  deleteService,
};
