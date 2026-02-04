const { generateUUID } = require("../utils/uuid");
const tasks = [];

function createTask(data) {
  if (tasks.some(t => t.title === data.title)) 
    throw new Error("TASK_TITLE_EXISTS");
  const task = { id: generateUUID(), ...data };
  tasks.push(task);
  return task;
}

function getAllTasks(filters = {}) {
  let result = tasks;
  if (filters.status) result = result.filter(t => t.status === filters.status);
  if (filters.priority) result = result.filter(t => t.priority === filters.priority);
  return result;
}

module.exports = { createTask, getAllTasks};