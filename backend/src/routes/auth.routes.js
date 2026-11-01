const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/auth.controller');


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/current', getCurrentUser);

module.exports = router;