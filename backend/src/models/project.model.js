const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
    },

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Workspace'
    },

    startDate: {
        type: Date
    },

    dueDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
        default: 'Not Started'
    }
})

module.exports = mongoose.model('Project', projectSchema);