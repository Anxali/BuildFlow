const express = require('express');
const router = express.Router();

const { createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspaceById, updateWorkspace, getMyWorkspaces } = require('../controllers/workspace.controller');

router.put('/create', createWorkspace);
router.delete('/delete/:name', deleteWorkspace);
router.get('/getAll', getAllWorkspaces);
router.get('/get', getMyWorkspaces);
router.get('/get/:id', getWorkspaceById);
router.patch('/update/:id', updateWorkspace);

module.exports = router;