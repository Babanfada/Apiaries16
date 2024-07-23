const router = require("express").Router();
const { getAllEmployees } = require("../controllers/employee");

router.route("/").get(getAllEmployees);

module.exports = router;
