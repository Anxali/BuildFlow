const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
    },

    assignee: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    comments: [{
        
            text: String,
            createdBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },

            taskId:{
                type: mongoose.Schema.ObjectId,
                ref: 'Task'
            }}
        
    ],

    status: {
        type: String,
        enum: [ 'ToDo' , 'In Progress' , 'Done' , 'Blocked' , 'Cancelled' , 'Backlog'],
        default: 'ToDo'
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },

    project: {
        type: mongoose.Schema.ObjectId,
        reference: 'Project',
        required:true
    }
    
})

module.exports = mongoose.model('Task', taskSchema)