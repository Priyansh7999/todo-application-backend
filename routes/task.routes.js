const express = require("express");
const controller = require("../controllers/task.controller.js")

const router = express.Router();

router.post("/", controller.createTask);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.patch("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
