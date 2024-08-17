const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  updateProductColor,
} = require("../controllers/products");
const {
  createOrUpdateReview,
  getAllReviewsForSingleProduct,
//   getAllReviewsForSingleProductByUser,
} = require("../controllers/reviews");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(getAllProducts)
  .post(authenticated, authorizedPermissions("admin"), createProduct);
router
  .route("/uploadproductimages/:product_id")
  .patch(authenticated, authorizedPermissions("admin"), uploadProductImages);
router
  .route("/updateproductcolor/:product_id")
  .patch(authenticated, authorizedPermissions("admin"), updateProductColor);

router
  .route("/:product_id")
  .get(getSingleProduct)
  .patch(authenticated, authorizedPermissions("admin"), updateProduct)
  .delete(authenticated, authorizedPermissions("admin"), deleteProduct);

//   REVIEWS
router
  .route("/singleproductreviews/:product_id")
  .get(getAllReviewsForSingleProduct);
router
  .route("/createorupdatereview/:product_id")
  .patch(authenticated, createOrUpdateReview);
// router
//   .route("/getAllReviewsForSingleProductByUser/:product_id")
//   .patch(authenticated, getAllReviewsForSingleProductByUser);

module.exports = router;
