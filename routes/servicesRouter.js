const {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getSingleService,
} = require("../controllers/services");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllServices)
  .post(authenticated, authorizedPermissions("admin"), createService);

router
  .route("/:service_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleService)
  .patch(authenticated, authorizedPermissions("admin"), updateService)
  .delete(authenticated, authorizedPermissions("admin"), deleteService);
module.exports = router;
