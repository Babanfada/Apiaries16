const {
  getAllHives,
  getSingleHive,
  createHive,
  updateHive,
  deleteHive,
} = require("../controllers/hives");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllHives)
  .post(authenticated, authorizedPermissions("admin"), createHive);

router
  .route("/:hive_id")
  .get(authenticated, authorizedPermissions("admin", "test"), getSingleHive)
  .patch(authenticated, authorizedPermissions("admin"), updateHive)
  .delete(authenticated, authorizedPermissions("admin"), deleteHive);
module.exports = router;
