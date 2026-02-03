class Task {
  constructor({ id, title, description, status, priority }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.createdAt = new Date().toLocaleTimeString();
    this.updatedAt = new Date().toLocaleTimeString();
  }

  update(fields) {
    Object.assign(this, fields);
    this.updatedAt = new Date().toLocaleTimeString();
  }
}

module.exports = Task;
