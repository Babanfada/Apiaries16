const router = require("express").Router();

const {
  register,
  verifyMail,
  login,
  showMe,
  logout,
  checkUserRegisterationStatus,
  forgotPassword,
  resetPassword,
  blacklist,
} = require("../controllers/authFlow");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

router.route("/register").post(register);
router.route("/verify-email").post(verifyMail);
router.route("/login").post(login);
router.route("/logout").delete(authenticated, logout);
router.route("/check").get(checkUserRegisterationStatus);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").patch(resetPassword);
router.route("/showme").get(authenticated, showMe);
router.route("/blacklist/:id").patch(authenticated, blacklist);

module.exports = router;
