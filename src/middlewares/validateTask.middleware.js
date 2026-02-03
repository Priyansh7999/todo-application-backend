const validStatus = ["Pending", "In Progress", "Completed"];
const validPriority = ["Low", "Medium", "High"];

function validateTask(req, res, next) {
  const { title, description, status, priority } = req.body;

 

  
//   if (!title || title.trim().length === 0) {  // Auto-generate title if empty or spaces would love to implement in future
//     title = description.trim().substring(0, 3);
//     req.body.title = title;
//   }

  if ( title.length > 100) {
    return res.status(400).json({ message: "Invalid title (must be 100 characters or less)" });
  }


  if (!description || description.length > 500) {
    return res.status(400).json({ message: "description should be within 500 words" });
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
