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
            throw new Error("Task with this title already exists");
        }

        const task = new Task({
            id: generateUUID(),
            ...data
        });

        this.tasks.push(task);
        return task;
    }

    getAllTasks(filters = {}) {
        let result = this.tasks;

        if (filters.status) {
            result = result.filter(task => task.status.toLowerCase() === filters.status.toLowerCase());
        }

        if (filters.priority) {
            result = result.filter(task => task.priority.toLowerCase() === filters.priority.toLowerCase());
        }
        if(result.length === 0){
            return "No tasks found matching the criteria";
        }

        return result;
    }

}

module.exports = new TaskService();