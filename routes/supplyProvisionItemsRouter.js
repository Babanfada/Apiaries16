const {
  getAllProvisions,
  createProvision,
  getSingleProvisions,
  updateProvision,
  deleteProvision,
} = require("../controllers/supply_provision_items");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllProvisions)
  .post(authenticated, authorizedPermissions("admin"), createProvision);

router
  .route("/:item_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleProvisions)
  .patch(authenticated, authorizedPermissions("admin"), updateProvision)
  .delete(authenticated, authorizedPermissions("admin"), deleteProvision);
module.exports = router;
