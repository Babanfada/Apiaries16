const {
  getAllReviews,
  getAllReviewsByUser,
  deleteReview,
  uploadReviewImages,
} = require("../controllers/reviews");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllReviews);
router.route("/reviewsbycurrentuser").get(authenticated, getAllReviewsByUser);
router.route("/uploadreviewimages/:review_id").patch(authenticated, uploadReviewImages);
router.route("/:review_id").delete(authenticated, deleteReview);
module.exports = router;
