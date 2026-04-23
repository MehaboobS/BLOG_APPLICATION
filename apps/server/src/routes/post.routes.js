const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", postController.getAll);
router.get("/me", auth, postController.getMine);
router.post("/", auth, postController.create);
router.put("/:id", auth, postController.update);
router.delete("/:id", auth, postController.delete);

module.exports = router;