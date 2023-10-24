const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.showAll);

router.get("/add", moviesController.addForm);
router.post("/add", moviesController.addPost);

router.get("/:id/edit", moviesController.editForm);
router.post("/:id/edit", moviesController.editPost);

router.get("/:id/delete", moviesController.delete);

module.exports = router;