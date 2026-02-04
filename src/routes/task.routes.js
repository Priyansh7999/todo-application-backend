const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

router.post("/", validateTask.validateCreateTask, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.patch("/:id", validateTask.validateUpdateTask, taskController.updateTask);


module.exports = router;
