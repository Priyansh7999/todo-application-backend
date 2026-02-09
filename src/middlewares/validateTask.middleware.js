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

function validateBulkDelete(req, res, next) {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: {
        code: "INVALID_IDS_ARRAY",
        message: "Invalid or missing IDs array"
      }
    });
  }
  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateBulkDelete
}
