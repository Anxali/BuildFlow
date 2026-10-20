const express = require("express");
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

app.use('/api/auth', authRoutes);

module.exports = app;