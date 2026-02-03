const { v4: uuid } = require("uuid");
const Task = require("../domain/task.js");
const repo = require("../repositories/taskRepository.js");

//Create Task
const createTask = ({ title, description, priority }) => {
  if (repo.existsByTitle(title)) {
    throw new Error("Duplicate task title");
  }

  const task = new Task({
    id: uuid(),
    title,
    description,
    status: "Pending",
    priority
  });

  return repo.saveTask(task);
};

// List All Tasks Filterablew by status or priority.
const getTasks = (filters) =>
  repo.findTasksAll().filter(t =>
    (!filters.status || t.status === filters.status) &&
    (!filters.priority || t.priority === filters.priority)
  );


//Get Single Task Retrieve details by ID;
const getTaskById = (id) => {
  const task = repo.findTaskById(id);
  if (!task) throw new Error("Task not found");
  return task;
};

//Update Task just changing the status
const updateTask = (id, fields) => {
  const task = getTaskById(id);
  task.update(fields);
  return repo.saveTask(task);
};

const deleteTask = (id) => {
  getTaskById(id);
  repo.removeTask(id);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
