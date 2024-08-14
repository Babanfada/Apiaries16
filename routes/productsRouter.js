const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
} = require("../controllers/products");
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
  .route("/:product_id")
  .get(getSingleProduct)
  .patch(authenticated, authorizedPermissions("admin"), updateProduct)
  .delete(authenticated, authorizedPermissions("admin"), deleteProduct);
module.exports = router;
