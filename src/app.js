const express = require("express");
const taskRoutes = require("./routes/task.routes.js");

const app = express();

app.use(express.json());
app.use('/v1/tasks', taskRoutes);

module.exports = app;
