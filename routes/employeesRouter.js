const router = require("express").Router();
const { getAllEmployees } = require("../controllers/employee");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllEmployees);

module.exports = router;
