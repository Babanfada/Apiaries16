const {
  getAllHunters,
  getSingleHunter,
  createHunter,
  updateHunter,
  deleteHunter,
} = require("../controllers/swarmHunters");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin", "test"), getAllHunters)
  .post(authenticated, authorizedPermissions("admin"), createHunter);
router
  .route("/:hunter_id")
  .get(authenticated, authorizedPermissions("admin", "test"), getSingleHunter)
  .patch(authenticated, authorizedPermissions("admin"), updateHunter)
  .delete(authenticated, authorizedPermissions("admin"), deleteHunter);
module.exports = router;
