## ToDo Application: Only Backend Application

Design and implement a robust RESTful API for a Task Management System. The application must be built using the Model-View-Controller (MVC) architectural pattern, where the "View" is represented by JSON responses, No Database. The primary goal is to demonstrate mastery of Object-Oriented Programming (OOP) and Clean Architecture.
Each task should have:

A unique identifier (UUID).
A title (required, max 100 chars).
A description (required, max 500 chars).
A status (Pending, In Progress, Completed).
A priority level (Low, Medium, High).
Timestamps (Created At, Updated At).

The Backend App supports:

- Create Task: Validate input and prevent duplicate titles.
- List All Tasks: Filterable by status or priority.
- Update Task: Partially update fields (e.g., just changing the status).

---

## Prerequisites
- Node.js (v18+ recommended)
- Postmen (for testing purpose)

## Feature
### **1. Create Task**
Allows users to create new tasks with validation
- **Endpoint** : POST /v1/tasks 
```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "low | medium | high"
}
```
- Validates title and description length using middleware
- Tasks are created with a default status as pending and priority as low
- Prevents saving a task if another task with the same title already exists
- `createdAt` and `updatedAt` are set automatically during task creation
- Prevents saving a task if another task with the same title already exists

### **2. List Tasks**
Allows users to get new tasks with or without filter
- Returns all tasks when no filters are provided.
- Supports filtering by task status and priority.

**Endpoint**
- GET /v1/tasks
- GET /v1/tasks?status=pending
- GET /v1/tasks?priority=high
- GET /v1/tasks?status=pending&priority=medium

### **3. Update Task**
Allows users to update their tasks partially (any combination of fields).
**Endpoint**
- Endpoint: PATCH /v1/tasks/:id
- Request body
```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "low | medium | high"
}
```
- Validates updated fields if provided.
- Updates updatedAt automatically.

## Non Functional Requirements
1. Include URI versioning (/v1/tasks) 
2. Proper Status Codes use:
    a. 201 - create task
    b. 400 Bad Request
    c. 500 Server Error

2. Error Response Format:
```json
{
  "error": {
    "code": "INVALID_TASK_TITLE",
    "message": "Title is required and must be a string with a maximum length of 100 characters"
  }
}
```


## How to run

1. Clone the repository
```
git clone https://github.com/Priyansh7999/todo-application-backend.git
```

2. Navigate to the project directory
```
cd todo-application-backend
```

3. Install dependencies
```
npm install
```

4. Start the server
```
node src/server.js
```

5. The server will start on:
```
http://localhost:3000
```

---
