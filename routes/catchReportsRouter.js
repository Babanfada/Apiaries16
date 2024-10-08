const {
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
  getSingleReport,
} = require("../controllers/catch_reports");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllReports)
  .post(authenticated, authorizedPermissions("admin"), createReport);
router
  .route("/:report_id")
  .get(authenticated, authorizedPermissions("admin", "test"), getSingleReport)
  .patch(authenticated, authorizedPermissions("admin"), updateReport)
  .delete(authenticated, authorizedPermissions("admin"), deleteReport);
module.exports = router;
