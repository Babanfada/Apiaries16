const {
  getAllStations,
  getSingleStation,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/apStations");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();

router
  .route("/")
  .post(authenticated, authorizedPermissions("admin"), createStation)
  .get(authenticated, authorizedPermissions("admin"), getAllStations);
router
  .route("/:station_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleStation)
  .patch(authenticated, authorizedPermissions("admin"), updateStation)
  .delete(authenticated, authorizedPermissions("admin"), deleteStation);
module.exports = router;
