const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

router.post("/", validateTask, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.patch("/:id", validateTask, taskController.updateTask);


module.exports = router;
