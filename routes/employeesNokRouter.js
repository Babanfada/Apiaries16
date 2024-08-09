const {
  getAllEmployeeNOK,
  getSingleNOK,
  createNOK,
  updateNOK,
  deleteNOK,
} = require("../controllers/employee_nok");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllEmployeeNOK)
  .post(authenticated, authorizedPermissions("admin"), createNOK);

router
  .route("/:nok_id")
  .patch(authenticated, authorizedPermissions("admin"), updateNOK)
  .get(authenticated, authorizedPermissions("admin"), getSingleNOK)
  .delete(authenticated, authorizedPermissions("admin"), deleteNOK);
module.exports = router;
