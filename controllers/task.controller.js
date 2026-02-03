const taskService = require("../services/taskService");

const createTask = (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({"erorr" : {
      "code": "INVALID_TASK_DATA",
      "message": err.message,
    }});
  }
};

const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskService.getTasks(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({"error": {
      "code": "SERVER_ERROR",
      "message": "An unexpected error occurred while fetching tasks."
    }});
  }
};

const getTaskById = (req, res, next) => {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ "error": {
      "code": "TASK_NOT_FOUND",
      "message": err.message
    }});
  }
};

const updateTask = (req, res, next) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(404).json({ "error": {
      "code": "TASK_NOT_FOUND",
      "message": err.message
    }});
  }
};

const deleteTask = (req, res, next) => {
  try {
    taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ "error": {
      "code": "TASK_NOT_FOUND",
      "message": err.message
    }});
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
