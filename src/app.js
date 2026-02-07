// src/app.js
const express = require("express");
const taskRoutes = require("./routes/task.routes.js");

/* Express application
* config Middleware & routes
*/
const app = express();

app.use(express.json());
app.use('/v1/tasks', taskRoutes);

module.exports = app;
