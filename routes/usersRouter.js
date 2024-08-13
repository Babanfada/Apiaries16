const router = require("express").Router();
const { getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/users");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllUsers);
  router
    .route("/:user_id")
    .get(authenticated, authorizedPermissions("admin"), getSingleUser)
    .patch(authenticated, authorizedPermissions("admin"), updateUser)
    .delete(authenticated, authorizedPermissions("admin"), deleteUser);

module.exports = router;
