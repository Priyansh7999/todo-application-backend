// src/controllers/task.controller.js
const taskService = require("../services/task.service");

/* Controller for managing task
*
* @class TaskController
*/

class TaskController {

    /**
    * Create a task
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {Response} - Sends JSON response with the created task or error
    **/

    createTask(req, res) {
        try {
            const task = taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({
                "error": {
                    "code": "TASK_CREATE_FAILED",
                    "message": error.message
                }
            })
        }
    }

    /** 
    * Get all task
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {Response} - Sends JSON response with list of tasks or error
    **/

    getAllTasks(req, res) {
        try {
            const { status, priority } = req.query;
            const tasks = taskService.getAllTasks({ status, priority });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({
                "error": {
                    "code": "TASK_FETCH_FAILED",
                    "message": error.message
                }
            })
        }
    }

    /**
    * Update a task
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {Response} - Sends JSON response with the updated task or error
    **/

    updateTask(req, res) {
        try {
            const task = taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (err) {
            res.status(404).json({
                "error": {
                    "code": "TASK_UPDATE_FAILED",
                    "message": err.message
                }
            })
        }
    };

    /** 
    *Get a single task
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {Response} - Sends JSON response with the task or error
    **/

    getSingleTask(req, res) {
        try {
            const task = taskService.getTaskById(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            res.status(404).json({
                "error": {
                    "code": "TASK_NOT_FOUND",
                    "message": error.message
                }
            })
        }
    }

    /**
     * To delete a task 
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {Response} - The response object with success message or error message
     **/

    deleteTask(req, res) {
        try {
            taskService.deleteTask(req.params.id);
            res.status(200).json({
                "success": true,
                "message": "Task deleted successfully"
            });
        } catch (error) {
            res.status(404).json({
                "error": {
                    "code": "TASK_DELETE_FAILED",
                    "message": error.message
                }
            })
        }
    }

    /**
     * Bulk delete tasks
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {Response} - The response object with success message or error message
     */
    bulkDeleteTasks(req, res) {
        try {
            const { ids } = req.body;
            taskService.bulkDeleteTasks(ids);
            res.status(200).json({
                "success": true,
                "message": "Tasks deleted successfully"
            });
        } catch (error) {
            res.status(400).json({
                "error": {
                    "code": "BULK_TASK_DELETE_FAILED",
                    "message": error.message
                }
            })
        }
    }
}

    /**
     * To create bulk tasks
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {Response} - The response object with list of created tasks or error message
     **/

    createBulkTasks(req, res) {
        try {
            const tasks = taskService.createBulkTasks(req.body);
            res.status(201).json(tasks);
        } catch (error) {
            res.status(400).json({
                "error": {
                    "code": "INVALID_TASK_DATA",
                    "message": error.message
                }
            })
        }
    }
}

module.exports = new TaskController();