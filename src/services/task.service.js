const Task = require("../models/task.model");
const { generateUUID } = require("../utils/uuid");


class TaskService {
    constructor() {
        this.tasks = []; // in memory storage
    }

    createTask(data) {
        const isDuplicate = this.tasks.some(
            task => task.title.toLowerCase() === data.title.toLowerCase()
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
            return [];
        }

        return result;
    }
    updateTask(id, data) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            throw new Error("Task not found");
        }

        const existingTask = this.tasks[taskIndex];

        const noChanges =
            (data.title === undefined || data.title === existingTask.title) &&
            (data.description === undefined || data.description === existingTask.description) &&
            (data.status === undefined || data.status.toLowerCase() === existingTask.status) &&
            (data.priority === undefined || data.priority.toLowerCase() === existingTask.priority);

        if (noChanges) {
            return "No changes made to the task";
        }

        const updatedTask = {
            ...existingTask,
            ...data,
            status: data.status ? data.status.toLowerCase() : existingTask.status,
            priority: data.priority ? data.priority.toLowerCase() : existingTask.priority,
            updatedAt: new Date()
        };

        this.tasks[taskIndex] = updatedTask;

        return updatedTask;
    }


    
    getTaskById(id){
        const task = this.tasks.find(task => task.id === id);
        if(!task){
            throw new Error("Task not found");
        }
        return task;
    }

}

module.exports = new TaskService();