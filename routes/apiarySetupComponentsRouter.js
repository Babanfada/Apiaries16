const {
  getAllComponents,
  getSingleComp,
  createComp,
  updateComponent,
  deleteComponent,
} = require("../controllers/apiary_setup_component");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllComponents)
  .post(authenticated, authorizedPermissions("admin"), createComp);
router
  .route("/:component_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleComp)
  .patch(authenticated, authorizedPermissions("admin"), updateComponent)
  .delete(authenticated, authorizedPermissions("admin"), deleteComponent);
module.exports = router;
