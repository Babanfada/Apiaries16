const router = require("express").Router();
const { getAllUsers } = require("../controllers/users");
router.route("/").get(getAllUsers);

module.exports = router;
