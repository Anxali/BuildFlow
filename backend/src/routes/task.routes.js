const express = require('express')
const router = express.Router()
const {createTask, deleteTask, updateTask, addComment, deleteComment, getTaskByProject, getAllTask, getTaskById} = require('../controllers/task.controller')

router.put('/create', createTask);
router.delete('/delete/:id',deleteTask);
router.patch('/update/:id', updateTask);
router.put('/comment/:taskId', addComment);
router.delete('/:taskId/comment/:commentId', deleteComment);
router.get('/get', getAllTask);
router.get('/get/:id', getTaskById);
router.get('/get/project/:id', getTaskByProject);

module.exports = router;