const express = require('express');
const router = express.Router();

const { createWorkspace, deleteWorkspace,  } = require('../controllers/workspace.controller');

router.post('/create', createWorkspace);
router.delete('/delete/:name', deleteWorkspace);

module.exports = router;