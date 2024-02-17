const Task = require('../models/Task');

const addTask = (req, res) => {
    try {
        Task.createTask(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to create Task.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ success: false, message: 'Task not created!' });
                } else {
                    res.status(200).json({ success: true, message: 'Task Created.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while creating task.' });
    }
};


const updateTask = (req, res) => {
    try {
        Task.updateTask(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to update Task.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ success: false, message: 'Task not updated!' });
                } else {
                    res.status(200).json({ success: true, message: 'Task updated.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while updating task.' });
    }
};


const deleteTask = (req, res) => {
    try {
        Task.deleteTask(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to delete Task.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ success: false, message: 'Task not deleted!' });
                } else {
                    res.status(200).json({ success: true, message: 'Task deleted.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while deleting task.' });
    }
}


const fetchTask = (req, res) => {
    try {
        Task.fetchTask(req.body, req.params.AssignedTo , (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to show task.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'task not fetched!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'task fetched.', data: data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching task.' });
    }
}


const updateTaskStatus = (req, res) => {
    try {
        Task.updateTaskStatus(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to update Task.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ success: false, message: 'Task not updated!' });
                } else {
                    res.status(200).json({ success: true, message: 'Task status updated.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while updating task.' });
    }
}


module.exports = {addTask, updateTask, deleteTask, fetchTask, updateTaskStatus}