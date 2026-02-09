// src/server.js
const app = require("./app");
const pool = require("./config/db");

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  } else {
    console.log("Connected to the database");
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
