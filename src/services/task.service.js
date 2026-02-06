// src/services/task.service.js
const Task = require("../models/task.model");
const { generateUUID } = require("../utils/uuid");

/* Service for managing task
*
* @class TaskService
*/

class TaskService {
    constructor() {
        this.tasks = []; // in memory storage
    }

    /**
     * Create a new task.
     * @param {Object} data - Task data containing title, description, status, priority
     * @returns {Object} Newly created task
     * @throws {Error} If a task with the same title already exists
     */

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

    /**
     * Get all tasks filtered by status and/or priority
     * @param {Object} filters - Optional filters (status, priority)
     * @returns {Array<Object>} List of matching tasks
     */

    getAllTasks(filters = {}) {
        let result = this.tasks;

        if (filters.status) {
            result = result.filter(task => task.status.toLowerCase() === filters.status.toLowerCase());
        }

        if (filters.priority) {
            result = result.filter(task => task.priority.toLowerCase() === filters.priority.toLowerCase());
        }

        return result;
    }

    /**
     * Update an existing task
     * @param {string} id - Task ID
     * @param {Object} data - Fields to update
     * @returns {Object} Updated task
     * @throws {Error} If task is not found or update is invalid
     */

    updateTask(id, data) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            throw new Error("Task not found");
        }

        const existingTask = this.tasks[taskIndex];
        if (data.title) {
            const isDuplicate = this.tasks.some(
                task =>
                    task.id === id &&
                    task.title.toLowerCase() === data.title.toLowerCase()
            );

            if (isDuplicate) {
                throw new Error("Task with this title already exists");
            }
        }
        const noChanges =
            (data.title === undefined || data.title === existingTask.title) &&
            (data.description === undefined || data.description === existingTask.description) &&
            (data.status === undefined || data.status.toLowerCase() === existingTask.status) &&
            (data.priority === undefined || data.priority.toLowerCase() === existingTask.priority);

        if (noChanges) {
            throw new Error("No changes provided");
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

    /**
     * Get a task by ID
     * @param {string} id - Task ID
     * @returns {Object} Task object
     * @throws {Error} If task is not found
     */

    getTaskById(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new Error("Task not found");
        }
        return task;
    }

    /**
     * Delete a task by ID
     * @param {string} id - Task ID
     * @throws {Error} If task is not found
     */

    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);

        if (this.tasks.length === initialLength) {
            throw new Error("Task not found");
        }
    }


}

module.exports = new TaskService();