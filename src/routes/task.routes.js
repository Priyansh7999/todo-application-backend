const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

router.post("/tasks", validateTask, taskController.createTask);
 router.get("/tasks", taskController.getAllTasks);


module.exports = router;
