const {
  getAllEquipments,
  createEquipment,
  getSingleEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment_tools");
const {
  authenticated,
  authorizedPermissions,
} = require("../middlewares/authentication");

const router = require("express").Router();
router
  .route("/")
  .get(authenticated, authorizedPermissions("admin"), getAllEquipments)
  .post(authenticated, authorizedPermissions("admin"), createEquipment);
router
  .route("/:tool_id")
  .get(authenticated, authorizedPermissions("admin"), getSingleEquipment)
  .patch(authenticated, authorizedPermissions("admin"), updateEquipment)
  .delete(authenticated, authorizedPermissions("admin"), deleteEquipment);
module.exports = router;
