const express = require("express");
const router = express.Router();
const { createProject, deleteProject, updateProject, getAllProjects, getMyProjects, getProjectByName, getProjectByWorkspace} = require('../controllers/project.controller');

router.put('/create', createProject);
router.delete('/delete/:name', deleteProject);
router.get('/getAll', getAllProjects);
router.get('/get', getMyProjects);
router.get('/get/:name', getProjectByName);
router.get('/get/workspace/:workspaceId', getProjectByWorkspace);
router.patch('/update/:id', updateProject);

module.exports = router;