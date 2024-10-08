const {
  getAllITEMS,
  createItem,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../controllers/consultancy_item");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllITEMS)
  .post(authenticated, authorizedPermissions("admin"), createItem);
router
  .route("/:item_id")
  .get(authenticated, authorizedPermissions("admin", "test"), getSingleItem)
  .patch(authenticated, authorizedPermissions("admin"), updateItem)
  .delete(authenticated, authorizedPermissions("admin"), deleteItem);
module.exports = router;
