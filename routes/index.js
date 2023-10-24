const express = require("express");

const router = express.Router();

const Controller = require("../controllers/Controller");
const moviesController = require("../controllers/moviesController");

const usersRouter = require("./users");
const moviesRouter= require("./movies");

router.get("/", moviesController.home);

router.use("/", usersRouter);
router.use("/movies", moviesRouter);

module.exports = router;