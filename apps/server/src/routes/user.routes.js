const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const userController = require("../controllers/user.controller");

router.get("/", auth, authorize("admin"), userController.getAllUsers);

module.exports = router;