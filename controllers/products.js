const {
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../middlewares/customErrors");
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
    packaging_type: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    // product_type: (value) => value,
    product_type: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: [
            "honey",
            "wax",
            "propolis",
            "royal jelly",
            "venom",
          ],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }

      return undefined;
    },
    // packaging_type: (value) => value,
    // available: (value) => {
    //   if (value === "All") {
    //     return { [Sequelize.Op.or]: [true, false] }; // This will include all rows regardless of the 'available' status
    //   }
    //   if (value !== "All" && value !== undefined) {
    //     return value === "true";
    //   }
    //   return undefined; // Return undefined to skip adding this filter
    // },
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
  const limit = Number(req.query.limit) || 5;
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

  const totalQuantity = await PRODUCTS.findAll({
    attributes: [
      "product_type",
      [
        Sequelize.fn("SUM", Sequelize.literal("quantity * total_in_stock")),
        "total_quantity",
      ],
      "unit",
    ],
    group: ["product_type", "unit"],
  });

  res.status(StatusCodes.OK).json({
    products,
    totalProducts,
    count: products.length,
    numOfPages,
    totalQuantity,
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
      },
      {
        model: COLORS,
        required: false,
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
  await product.destroy({
    where: { product_id },
  });
  res.status(StatusCodes.OK).json({
    msg: `Product details with the id:${product_id} removed permanently`,
  });
};

const uploadProductImages = async (req, res) => {
  const { product_id } = req.params;
  const productImages = Object.values(req.files || {});

  console.log("Total number of uploaded files:", productImages.length);
  console.log("Files array:", productImages); // Logging the entire array structure

  if (productImages.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "No files were uploaded. Please upload at least one image.",
    });
  }

  try {
    // Fetch existing image record for the product
    const image = await IMAGES.findOne({ where: { product_id } });
    if (!image) {
      throw new UNAUTHORIZED(
        `The product with id ${product_id} has not been created. Please create the product first!!!`
      );
    }

    // Adding a log before mapping to ensure the array hasn't been altered
    console.log("Mapping through product images...");

    // Validate and upload images
    const uploadedImages = await Promise.all(
      productImages.map(async (productImage, i) => {
        // Logging the current productImage at the beginning of each iteration
        console.log(`File ${i + 1}/${productImages.length}:`, productImage);

        if (!productImage) {
          console.warn(`File at index ${i} is undefined or null, skipping...`);
          return null;
        }

        // Check if mimetype is defined before calling startsWith
        if (
          !productImage.mimetype ||
          !productImage.mimetype.startsWith("image")
        ) {
          console.warn(`File ${i + 1} is not a valid image, skipping...`);
          return null;
        }

        // Validate file size
        const maxSize = 2000 * 3000; // 6MB
        if (productImage.size > maxSize) {
          console.warn(`File ${i + 1} exceeds size limit, skipping...`);
          return null;
        }

        // Delete existing image on Cloudinary if it exists
        const currentPublicId = image[`img${i}_public_id`];
        if (currentPublicId) {
          await cloudinary.uploader.destroy(currentPublicId);
        }

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(
          productImage.tempFilePath,
          {
            use_filename: true,
            folder: "Apiaries 16 product Images",
          }
        );

        // Update image record in the database
        image[`image${i}`] = result.secure_url;
        image[`img${i}_public_id`] = result.public_id;
        await image.save();

        // Return details of the uploaded image
        return {
          id: result.public_id,
          src: result.secure_url,
        };
      })
    );

    // Filter out any null results (skipped files)
    const validUploadedImages = uploadedImages.filter(Boolean);

    // Send response with uploaded images
    res.status(StatusCodes.OK).json({
      images: validUploadedImages,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  } finally {
    // Clean up all temporary files
    productImages.forEach((productImage) => {
      if (
        productImage &&
        productImage.tempFilePath &&
        fs.existsSync(productImage.tempFilePath)
      ) {
        fs.unlinkSync(productImage.tempFilePath);
      }
    });
  }
};

const updateProductColor = async (req, res) => {
  const { product_id } = req.params;
  const product_color = await COLORS.findOne({ where: { product_id } });
  if (!product_color) throw new BAD_REQUEST("This product does not exist");
  await product_color.update(req.body);
  res.status(StatusCodes.OK).json({
    msg: "color details updated successfully",
  });
};
module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  updateProductColor,
};
