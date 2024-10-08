const {
  getAllPolServices,
  createPolService,
  getSinglePolService,
  updatePolService,
  deletePolService,
} = require("../controllers/pollination_services");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllPolServices)
  .post(authenticated, authorizedPermissions("admin"), createPolService);
router
  .route("/:pol_service_id")
  .get(
    authenticated,
    authorizedPermissions("admin", "test"),
    getSinglePolService
  )
  .patch(authenticated, authorizedPermissions("admin"), updatePolService)
  .delete(authenticated, authorizedPermissions("admin"), deletePolService);
module.exports = router;
