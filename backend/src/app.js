const express = require("express");
const authRoutes = require('./routes/auth.routes');
const workspaceRoutes = require('./routes/workspace.routes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/workspace', authMiddleware, workspaceRoutes);

module.exports = app;