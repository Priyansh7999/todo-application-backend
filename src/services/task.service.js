const Task = require("../models/task.model");
const { generateUUID } = require("../utils/uuid");


class TaskService {
    constructor() {
        this.tasks = []; // in memory storage
    }

    createTask(data) {
        const isDuplicate = this.tasks.some(
            task => task.title === data.title
        );

        if (isDuplicate) {
            throw new Error("TASK_TITLE_EXISTS");
        }

        const task = new Task({
            id: generateUUID(),
            ...data
        });

        this.tasks.push(task);
        return task;
    }

}

module.exports = new TaskService();