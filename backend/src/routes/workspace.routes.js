const express = require('express');
const router = express.Router();

const { createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspaceByName, updateWorkspace } = require('../controllers/workspace.controller');

router.put('/create', createWorkspace);
router.delete('/delete/:name', deleteWorkspace);
router.get('/getAll', getAllWorkspaces);
router.get('/get/:name', getWorkspaceByName);
router.patch('/update/:id', updateWorkspace);

module.exports = router;