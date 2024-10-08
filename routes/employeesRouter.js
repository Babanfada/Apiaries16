const router = require("express").Router();
const {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadAvatar,
} = require("../controllers/employee");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllEmployees)
  .post(authenticated, authorizedPermissions("admin"), createEmployee);
router
  .route("/uploadavatar/:emp_id")
  .patch(authenticated, authorizedPermissions("admin"), uploadAvatar);
router
  .route("/:emp_id")
  .get(authenticated, authorizedPermissions("admin", "test"), getSingleEmployee)
  .patch(authenticated, authorizedPermissions("admin"), updateEmployee)
  .delete(authenticated, authorizedPermissions("admin"), deleteEmployee);

module.exports = router;
