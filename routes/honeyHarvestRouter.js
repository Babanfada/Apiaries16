const {
  getAllHarvest,
  createHarvest,
  getSingleHarvest,
  updateHarvest,
  deleteHarvest,
} = require("../controllers/honeyHarvest");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();

router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllHarvest)
  .post(authenticated, authorizedPermissions("admin"), createHarvest);
router
  .route("/harvest_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleHarvest)
  .patch(authenticated, authorizedPermissions("admin"), updateHarvest)
  .delete(authenticated, authorizedPermissions("admin"), deleteHarvest);
module.exports = router;
