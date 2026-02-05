const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

router.post("/", validateTask.validateCreateTask, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.patch("/:id", validateTask.validateUpdateTask, taskController.updateTask);

router.get("/:id", taskController.getSingleTask);
router.delete("/:id",taskController.deleteTask);
module.exports = router;
