const {
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  review_images: REVIEW_IMAGES,
  products: PRODUCTS,
  reviews: REVIEWS,
} = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const { checkPermissions } = require("../middlewares/authentication");

const getAllReviews = async (req, res) => {
  const queryObject = {};
  const totalReviews = await REVIEWS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    title: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
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
    const options = ["rating"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        queryObject[field] = {
          [Sequelize.Op[operator]]: Number(value),
        };
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalReviews / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["rating", "DESC"]];
      break;
    case "low-high":
      sortList = [["rating", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const reviews = await REVIEWS.findAll({
    where: { ...queryObject },
    include: [
      {
        model: REVIEW_IMAGES,
        required: false,
      },
    ],
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });

  res.status(StatusCodes.OK).json({
    reviews,
    totalReviews,
    count: reviews.length,
    numOfPages,
  });
};
const getAllReviewsForSingleProduct = async (req, res) => {
  const { product_id } = req.params;
  const reviews = await REVIEWS.findOne({
    where: { product_id },
    include: [
      {
        model: REVIEW_IMAGES,
        required: false,
      },
    ],
  });
  if (!reviews) {
    throw new NOT_FOUND(
      `There is no reviews for the product with id of ${product_id}`
    );
  }
  res.status(StatusCodes.OK).json({ reviews });
};
// const getAllReviewsForSingleProductByUser = async (req, res) => {
//   const { product_id } = req.params;
//   const { user_id } = req.user;
//   const reviews = await REVIEWS.findOne({
//     where: { product_id, user_id },
//     include: [
//       {
//         model: REVIEW_IMAGES,
//         required: false,
//       },
//     ],
//   });
//   if (!reviews) {
//     throw new NOT_FOUND(
//       `There is no reviews for the product with id of ${product_id}`
//     );
//   }
//   res.status(StatusCodes.OK).json({ reviews });
// };
const getAllReviewsByUser = async (req, res) => {
  const { user_id, fullname } = req.user;
  const reviews = await REVIEWS.findAll({
    where: { user_id },
    include: [
      {
        model: REVIEW_IMAGES,
        required: false,
      },
    ],
  });

  if (reviews.length === 0) {
    throw new NOT_FOUND(`${fullname} has not reviewed any product`);
  }
  checkPermissions({ reqUser: req.user, resUser: user_id });
  res.status(StatusCodes.OK).json({ reviews });
};

const createOrUpdateReview = async (req, res, next) => {
  const { product_id } = req.params;
  //   console.log(product_id, req.user.user_id);
  // Check if the product exists
  const product = await PRODUCTS.findOne({ where: { product_id } });
  if (!product) {
    throw new BAD_REQUEST("Product does not exist");
  }

  // Check if the user has already reviewed the product
  const reviewedByUser = await REVIEWS.findOne({
    where: { product_id, user_id: req.user.user_id },
  });
  //   console.log(reviewedByUser);
  if (reviewedByUser) {
    // Update the existing review
    await reviewedByUser.update(req.body);
    res
      .status(StatusCodes.OK)
      .json({ msg: "Product review updated successfully" });
  } else {
    // Create a new review
    req.body.user_id = req.user.user_id;
    req.body.product_id = product_id; // Ensure product_id is set
    const newReview = await REVIEWS.create({ ...req.body });
    res.status(StatusCodes.OK).json({
      newReview,
      msg: `${product.product_name} successfully reviewed`,
    });
  }
};

const deleteReview = async (req, res, next) => {
  const { review_id } = req.params;
  // Find the review by review_id and user_id
  const review = await REVIEWS.findOne({
    where: { review_id, user_id: req.user.user_id },
  });

  if (!review) {
    throw new BAD_REQUEST(
      "Review not found or you are not authorized to delete this review"
    );
  }

  // Delete the review
  await review.destroy();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Product review deleted successfully" });
};

const uploadReviewImages = async (req, res) => {
  const { review_id } = req.params;
  const reviewImages = Object.values(req.files);

  try {
    // Fetch existing image record for the reviews
    const image = await REVIEW_IMAGES.findOne({ where: { review_id } });
    if (!image) {
      throw new UNAUTHORIZED(
        `The review with id ${review_id} has not been created. Please create the reviews first!!!`
      );
    }

    // Validate and upload images
    const uploadedImages = await Promise.all(
      reviewImages.map(async (reviewImage, i) => {
        // Validate image type and size
        if (!reviewImage.mimetype.startsWith("image")) {
          throw new BAD_REQUEST("Please upload a valid image.");
        }

        const maxSize = 2000 * 3000; // 6MB
        if (reviewImage.size > maxSize) {
          throw new BAD_REQUEST("Uploaded files should not exceed 18MB.");
        }

        // Delete existing image on Cloudinary if it exists
        const currentPublicId = image[`img${i}_public_id`];
        if (currentPublicId) {
          await cloudinary.uploader.destroy(currentPublicId);
        }

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(
          reviewImage.tempFilePath,
          {
            use_filename: true,
            folder: "Apiaries 16 user's review Images",
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

    // Send response with uploaded images
    res.status(StatusCodes.OK).json({
      images: uploadedImages,
    });
  } catch (error) {
    // next(error); // Pass the error to the custom error handling middleware
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  } finally {
    // Clean up all temporary files
    reviewImages.forEach((reviewImage) => {
      if (fs.existsSync(reviewImage.tempFilePath)) {
        fs.unlinkSync(reviewImage.tempFilePath);
      }
    });
  }
};

module.exports = {
  getAllReviews,
  getAllReviewsForSingleProduct,
  getAllReviewsByUser,
  //   getAllReviewsForSingleProductByUser,
  createOrUpdateReview,
  deleteReview,
  uploadReviewImages,
};
