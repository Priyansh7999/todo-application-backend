const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

router.post("/", validateTask, taskController.createTask);
 router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getSingleTask);
module.exports = router;
