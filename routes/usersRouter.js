const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  subscribeToEmail,
  unSubscribeToEmail,
} = require("../controllers/users");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllUsers);
router.route("/avatar").post(authenticated, uploadAvatar);
router
  .route("/:user_id")
  .get(authenticated, getSingleUser)
  .patch(authenticated, updateUser)
  .delete(authenticated, authorizedPermissions("admin"), deleteUser);
router.route("/subscribe/:user_id").patch(authenticated, subscribeToEmail);
router.route("/unsubscribe/:user_id").patch(authenticated, unSubscribeToEmail);
module.exports = router;
