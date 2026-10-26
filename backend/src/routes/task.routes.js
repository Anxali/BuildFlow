const express = require('express')
const router = express.Router()
const {createTask, deleteTask, updateTask, addComment, deleteComment, getAllTask, getTaskById} = require('../controllers/task.controller')

router.put('/create', createTask);
router.delete('/delete/:id',deleteTask);
router.patch('/update/:id', updateTask);
router.put('/comment', addComment);
router.patch('/task/:taskId/comment/:commentId', deleteComment);
router.get('/get', getAllTask);
router.get('/get/:id', getTaskById);

module.exports = router;