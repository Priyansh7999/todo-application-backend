//src/routes/task.routes.js
const express = require("express");
const router = express.Router();


/* Task routes  
* defines the rest API endpoints
*/

const taskController = require("../controllers/task.controller");
const validateTask = require("../middlewares/validateTask.middleware");

// create a new task 
router.post("/", validateTask.validateCreateTask, taskController.createTask);

// get all task with filters
router.get("/", taskController.getAllTasks);

// update single task
router.patch("/:id", validateTask.validateUpdateTask, taskController.updateTask);

// get a particulat task
router.get("/:id", taskController.getSingleTask);

//delete a task
router.delete("/:id", taskController.deleteTask);

// create bulk tasks
router.post("/bulk", validateTask.validateBulkTasks, taskController.createBulkTasks);
module.exports = router;
