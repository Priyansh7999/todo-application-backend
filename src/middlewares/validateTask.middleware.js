function validateTitle(title, res) {
  if (!title || typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 100) {
    res.status(400).json({
      error: {
        code: "INVALID_TASK_TITLE",
        message: "Title is required and must be atmost 100 characters"
      }
    });
    return false;
  }
  return true;
}

function validateDescription(description, res) {
  if (!description || typeof description !== 'string' || description.trim().length === 0 || description.trim().length > 500) {
    res.status(400).json({
      error: {
        code: "INVALID_TASK_DESCRIPTION",
        message: "Description is required and must be atmost 500 characters"
      }
    });
    return false;
  }
  return true;
}

function validateStatus(status, req, res) {
  if (!status) {
    req.body.status = 'pending';
    return true;
  }

  if (typeof status !== "string" || !['pending', 'in progress', 'completed'].includes(status.toLowerCase())) {
    res.status(400).json({
      error: {
        code: "INVALID_TASK_STATUS",
        message: "Invalid task status. Status must be one of: pending, in progress, or completed."
      }
    });
    return false;
  }

  req.body.status = status.toLowerCase();
  return true;
}

function validatePriority(priority, req, res) {
  if (!priority) {
    req.body.priority = 'low';
    return true;
  }

  if (typeof priority !== "string" || !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
    res.status(400).json({
      error: {
        code: "INVALID_TASK_PRIORITY",
        message: "Invalid task priority. Priority must be one of: low, medium, or high."
      }
    });
    return false;
  }

  req.body.priority = priority.toLowerCase();
  return true;
}

function validateCreateTask(req, res, next) {
  const { title, description, status, priority } = req.body;

  if (!validateTitle(title, res)) return;
  if (!validateDescription(description, res)) return;
  if (!validateStatus(status, req, res)) return;
  if (!validatePriority(priority, req, res)) return;

  next();
}

function validateUpdateTask(req, res, next) {
  const { id, title, description, status, priority, createdAt, updatedAt } = req.body;
  if(!id && !title && !description && !status && !priority){
    res.status(400).json({
      error: {
        code: "NO_FIELDS_TO_UPDATE",
        message: "At least one field must be provided for update"
      }
    });
    return;
  }
  if(id || createdAt || updatedAt){
    return res.status(400).json({
      error: {
        code: "INVALID_UPDATE_FIELDS",
        message: "id, createdAt, and updatedAt cannot be updated"
      }
    });
  }
  if (title !== undefined && !validateTitle(title, res)) return;
  if (description !== undefined && !validateDescription(description, res)) return;
  if (status !== undefined && !validateStatus(status, req, res)) return;
  if (priority !== undefined && !validatePriority(priority, req, res)) return;

  next();
}

function validateBulkTasks(req, res, next) {
  const tasks = req.body;

  if (tasks.length === 0) {
    return res.status(400).json({
      error: {
        code: "INVALID_TASKS_ARRAY",
        message: "Tasks array cannot be empty"
      }
    });
  }

  for (const task of tasks) {
    if (task === null) {
      return res.status(400).json({
        error: {
          code: "INVALID_TASK_OBJECT",
          message: "Task object cannot be null"
        }
      });
    }

    const { title, description, status, priority } = task;

    if (!validateTitle(title, res)) return;
    if (!validateDescription(description, res)) return;
    if (!validateStatus(status, req, res)) return;
    if (!validatePriority(priority, req, res)) return;
  }
  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateBulkTasks,
}
