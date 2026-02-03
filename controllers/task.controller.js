const taskService = require("../services/taskService");

const createTask = (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskService.getTasks(req.query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTaskById = (req, res, next) => {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = (req, res, next) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = (req, res, next) => {
  try {
    taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
