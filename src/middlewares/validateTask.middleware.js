const validStatus = ["Pending", "In Progress", "Completed"];
const validPriority = ["Low", "Medium", "High"];

function validateTask(req, res, next) {
  const { title, description, status, priority } = req.body;

  if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_TITLE",
                message: "Title is required and must be a string with a maximum length of 100 characters"
            }
        });
    }


  if (!description || typeof description !== 'string' || description.length > 500) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_DESCRIPTION",
                message: "Description is required and must be a string with a maximum length of 500 characters"
            }
        });
    }

  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (!validPriority.includes(priority)) {
    return res.status(400).json({ message: "Invalid priority" });
  }

  next(); // move ahead after all validations pass
}

module.exports = validateTask;
