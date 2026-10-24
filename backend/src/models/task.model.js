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
    },

    comments: [
        {
            type: String,
            createdBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],

    status: {
        type: String,
        enum: [ 'ToDo' , 'In Progress' , 'Done' , 'Blocked' , 'Cancelled' , 'Backlog'],
        default: 'ToDo'
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
    
})