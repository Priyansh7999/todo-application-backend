## ToDo Application: (Feel free to choose any language) Only Backend Application

Design and implement a robust RESTful API for a Task Management System. The application must be built using the Model-View-Controller (MVC) architectural pattern, where the "View" is represented by JSON responses, No Database. The primary goal is to demonstrate mastery of Object-Oriented Programming (OOP) and Clean Architecture.
Each task should have:

A unique identifier (UUID).
A title (required, max 100 chars).
A description (required, max 500 chars).
A status (Pending, In Progress, Completed).
A priority level (Low, Medium, High).
Timestamps (Created At, Updated At).

The Backend App must support:

Create Task: Validate input and prevent duplicate titles.
List All Tasks: Filterable by status or priority.
Get Single Task: Retrieve details by ID; handle "Not Found" scenarios gracefully.
Update Task: Partially update fields (e.g., just changing the status).
Delete Task: Remove a task and return an appropriate status code.

# ToDo Backend Application

A **clean MVC RESTful API** for Task Management built with **Node.js and Express**.  

---

## Folder Structure
```code
src/
 ├── controllers/
 │    └── task.controller.js
 ├── services/
 │    └── task.service.js
 ├── models/
 │    └── task.model.js
 ├── routes/
 │    └── task.routes.js
 ├── middlewares/
 │    └── validateTask.middleware.js
 ├── utils/
 │    └── uuid.js
 ├── app.js
 └── server.js
```
