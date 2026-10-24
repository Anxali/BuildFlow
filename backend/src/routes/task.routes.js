const express = require('express')
const router = express.router()
const {createTask, deleteTask, updateTask, addComment, deleteComment, editComment, getAllTask, getTaskById} = require('../controllers/task.controller')


module.exports = router;