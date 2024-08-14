const { NOT_FOUND, BAD_REQUEST } = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  products: PRODUCTS,
  product_colors: COLORS,
  product_images: IMAGES,
} = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

const getAllProducts = async (req, res) => {
  const queryObject = {};
  const totalProducts = await PRODUCTS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    product_name: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    product_type: (value) => value,
    packaging_type: (value) => value,
    available: (value) => {
      if (value === "All") {
        return { [Sequelize.Op.or]: [true, false] }; // This will include all rows regardless of the 'available' status
      }
      if (value !== "All" && value !== undefined) {
        return value === "true";
      }
      return undefined; // Return undefined to skip adding this filter
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
      "total_in_stock",
      "numOfTimesSold",
      "quantity",
      "price",
      "averageRating",
      "harvest_year",
      "numOfReviews",
    ];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        if (field === "harvest_year") {
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
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalProducts / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["price", "DESC"]];
      break;
    case "low-high":
      sortList = [["price", "ASC"]];
      break;
    case "A-Z":
      sortList = [["product_name", "ASC"]];
      break;
    case "Z-A":
      sortList = [["product_name", "DESC"]];
      break;
    case "high-rating":
      sortList = [["averageRating", "DESC"]];
      break;
    case "low-rating":
      sortList = [["averageRating", "ASC"]];
      break;
    case "high-reviews":
      sortList = [["numOfReviews", "DESC"]];
      break;
    case "low-reviews":
      sortList = [["numOfReviews", "ASC"]];
      break;
    case "high-sell":
      sortList = [["numOfTimesSold", "DESC"]];
      break;
    case "low-sell":
      sortList = [["numOfTimesSold", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const products = await PRODUCTS.findAll({
    where: { ...queryObject },
    include: [
      {
        model: IMAGES,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: COLORS,
        required: false,
        // as: "internallySupervising",
        // attributes: ["station_id", "station_name", "location"],
      },
    ],
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const productTypeCount = await PRODUCTS.findAll({
    attributes: [
      "product_type",
      [Sequelize.fn("COUNT", Sequelize.col("product_id")), "count"],
    ],
    group: ["product_type"],
  });
  const packagingTypeCount = await PRODUCTS.findAll({
    attributes: [
      "packaging_type",
      [Sequelize.fn("COUNT", Sequelize.col("product_id")), "count"],
    ],
    group: ["packaging_type"],
  });

  res.status(StatusCodes.OK).json({
    products,
    totalProducts,
    count: products.length,
    numOfPages,
    productTypeCount,
    packagingTypeCount,
  });
};
const getSingleProduct = async (req, res) => {
  const { product_id } = req.params;
  const product = await PRODUCTS.findOne({
    where: { product_id },
    include: [
      {
        model: IMAGES,
        required: false,
        // attributes: ["nok_id", "fullname", "phone", "gender", "relationship"],
      },
      {
        model: COLORS,
        required: false,
        // as: "internallySupervising",
        // attributes: ["station_id", "station_name", "location"],
      },
    ],
  });
  if (!product) {
    throw new NOT_FOUND(`There is no product with an id of ${product_id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  const product = await PRODUCTS.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ product, msg: "Successfully added a new product" });
};
const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const product = await PRODUCTS.findOne({ where: { product_id } });
  if (!product) {
    throw new NOT_FOUND(`There is no product with an id of ${product_id}`);
  }
  await PRODUCTS.update(req.body, {
    where: { product_id },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product details updated successfully" });
};
const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  const product = await PRODUCTS.findOne({ where: { product_id } });
  if (!product) {
    throw new NOT_FOUND(`There is no product with an id of ${product_id}`);
  }
  await PRODUCTS.destroy({
    where: { product_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Product details with the id:${product_id} removed permanently`,
  });
};
const uploadProductImages = async (req, res) => {
  const { product_id } = req.params;

  const productImages = Object.values(req.files);
    console.log(productImages);
  try {
    const image = await IMAGES.findOne({ where: { product_id } });

    const uploadPromises = productImages.map(async (productImage, i) => {
      if (!productImage.mimetype.startsWith("image")) {
        throw new BAD_REQUEST("Please upload an image.");
      }

      const maxSize = 2000 * 3000;
      if (productImage.size > maxSize) {
        throw new BAD_REQUEST("Uploaded files should not be more than 18MB.");
      }

      // Delete existing image if it exists
      const currentPublicId = image ? image[`img${i}_public_id`] : null;
      if (currentPublicId) {
        await cloudinary.uploader.destroy(currentPublicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(
        productImage.tempFilePath,
        {
          use_filename: true,
          folder: "Apiaries 16 user's Images",
        }
      );

      // Update or create new image records in the database
      if (image) {
        image[`image${i}`] = result.secure_url;
        image[`img${i}_public_id`] = result.public_id;
        await image.save();
      } else {
        const newImage = {};
        newImage[`image${i}`] = result.secure_url;
        newImage[`img${i}_public_id`] = result.public_id;
        newImage.product_id = product_id;
        await IMAGES.create(newImage);
      }
      const details = {
        id: result.public_id,
        src: result.secure_url,
      };
      //   return result.secure_url;
      return details;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    console.log(uploadProductImages);

    res.status(StatusCodes.OK).json({
      //   images: uploadedImages.map((imageUrl) => ({ src: imageUrl })),
      images: uploadedImages.map((imageUrl) => imageUrl),
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to upload images.",
    });
  } finally {
    // Clean up temporary files
    fs.unlinkSync(req.files.image.tempFilePath);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
};
