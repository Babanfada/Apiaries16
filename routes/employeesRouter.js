const router = require("express").Router();
const {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllEmployees)
  .post(authenticated, authorizedPermissions("admin"), createEmployee);
router
  .route("/:emp_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleEmployee)
  .patch(authenticated, authorizedPermissions("admin"), updateEmployee)
  .delete(authenticated, authorizedPermissions("admin"), deleteEmployee);

module.exports = router;
