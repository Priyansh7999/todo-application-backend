## ToDo Application: (Feel free to choose any language) Only Backend Application

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




# ToDo Backend Application

A **clean MVC RESTful API** for Task Management built with **Node.js and Express**.  

---

## Folder Structure
```code
src/
 ├── app.js
 └── server.js
```

## Installation & Setup
#### Prerequisites
- Node.js (v18+ recommended)
- npm

#### Steps

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
node run dev
```

5. The server will start on:
```
http://localhost:3000
```

---

## Testing the API

#### You can test the API using:

- Postman

