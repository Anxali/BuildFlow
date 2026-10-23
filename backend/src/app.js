const express = require("express");
const authRoutes = require('./routes/auth.routes');
const workspaceRoutes = require('./routes/workspace.routes');
const projectRoutes = require('./routes/project.routes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/workspace', authMiddleware, workspaceRoutes);
app.use('/api/project', authMiddleware, projectRoutes);

module.exports = app;