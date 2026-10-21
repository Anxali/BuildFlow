const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
})

module.exports = mongoose.model('Workspace', workspaceSchema);