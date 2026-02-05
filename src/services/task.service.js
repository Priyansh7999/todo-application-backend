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
     * @param {Object} - Task data conatins title, description, status, priority
     * @returns {Task} - The newly created task
     * @throws {Error} - Throws error if a task with the same title already exists
     **/

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
     * Get all tasks with filtered by status or priority
     * @param {Object}  - Filter options status and priority
     * @returns {Array} -  Array of tasks matching the filter
     **/

    getAllTasks(filters = {}) {
        let result = this.tasks;

        if (filters.status) {
            result = result.filter(task => task.status.toLowerCase() === filters.status.toLowerCase());
        }

        if (filters.priority) {
            result = result.filter(task => task.priority.toLowerCase() === filters.priority.toLowerCase());
        }
        if (result.length === 0) {
            return [];
        }

        return result;
    }

    /**
     * Update an existing task 
     * @param {string} id - The ID of the task to update
     * @param {Object} data - Task fields to update like title, description, status, priority
     * @returns {Object} - Updated task object
     * @throws {Error} Throws an error if task is not found
     **/
    
    updateTask(id, data) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            throw new Error("Task not found");
        }

        const existingTask = this.tasks[taskIndex];
        if (data.title) {
            const isDuplicate = this.tasks.some(
                task =>
                    task.id !== id &&
                    task.title.toLowerCase() === data.title.toLowerCase()
            );

            if (isDuplicate) {
                return "Task with this title already exists";
            }
        }
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

    /**
     * Get a task by id.
     * @param {string} - ID of the task
     * @returns {Object} The task object
     * @throws {Error} Throws an error if task is not found
     */

    getTaskById(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new Error("Task not found");
        }
        return task;
    }

    /* To delete a task by id
    * @param {string} id - The id of the task to delete
    * @returns {void}
    * @throws {Error} When the task is not found.
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