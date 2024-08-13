const {
  getAllSupplies,
  createSupply,
  getSingleSupply,
  updateSupply,
  deleteSupply,
} = require("../controllers/supplies");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllSupplies)
  .post(authenticated, authorizedPermissions("admin"), createSupply);
router
  .route("/:supply_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleSupply)
  .patch(authenticated, authorizedPermissions("admin"), updateSupply)
  .delete(authenticated, authorizedPermissions("admin"), deleteSupply);
module.exports = router;
