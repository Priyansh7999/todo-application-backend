const pool = require("../config/db");

async function findTaskByTitle(title) {
  const query = `
    SELECT * FROM tasks
    WHERE LOWER(title) = LOWER($1);
  `;

  const result = await pool.query(query, [title]);
  return result.rows[0];
}

async function createTask(data) {
  const query = `
    INSERT INTO tasks (id, title, description, status, priority)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    data.id,
    data.title,
    data.description,
    data.status,
    data.priority
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  findTaskByTitle,
  createTask
};
