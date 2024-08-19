const {
  getAllOrders,
  getSingleOrder,
  getAllOrdersByUser,
  createOrder,
  updateOrder,
  updateDelDetails,
} = require("../controllers/orders");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllOrders)
  .post(authenticated, createOrder);
  router.route("/getallordersbyuser").get(authenticated, getAllOrdersByUser);
  router.route("/updatedeliverydetails/:order_id").patch(authenticated, updateDelDetails);
router.route("/:order_id").get(authenticated, getSingleOrder);
router.route("/:order_id").patch(authenticated, updateOrder);
module.exports = router;
