const taskModel = require('../models/task.model');
const taskSchema = require('../models/task.model')

async function createTask(req,res){
    const {title, description, assignee, comments, status, priority} = req.body;

    if(!title){
        res.status(400).json({
            message: 'Title is required'
        });
    }

    const task = await taskSchema.create({
        title: title,
        description: description,
        assignee: assignee,
        comments: comments,
        status: status,
        priority: priority
    })

    res.status(200).json({
        message: 'Task created successfully',
        task
    })
}

async function deleteTask(req,res){
    const taskId = req.params.id;

    if(!taskId){
        res.status(400).json({
            message: 'task id not found'
        })
    }

    const task = taskModel.findByIdAndDelete(taskId);

    if(!task){
        res.status(400).json({
            message: 'task not found'
        })
    }

    res.status(200).json({
        message: 'task deleted successfully'
    })

}

async function updateTask(req,res){
    const taskId = req.params.id;

    if(!taskId){
        res.status(400).json({
            message: 'task id not found'
        })
    }

    const taskUpdate = await taskSchema({_id: taskId}, req.body, {new: true, runValidators: true})

    if(!taskUpdate){
        res.status(400).json({
            message: 'task not found'
        })
    }

    res.status(200).json({
        message: 'task updated successfully'
    })
}

async function addComment(req,res){
    const {text} = req.body;

    if(!text){
        res.status(400).json({
            message: 'cannot submit empty comment'
        })
    }

    taskSchema.comments.push({text})
}

async function deleteComment(req,res){
    const {taskId, commentId} = req.params;

    if(!commentId || !taskId){
        res.status(400).json({
            message: 'enter id'
        })
    }

    const deleteComment = await taskSchema.findOneAndUpdate({_id: taskId}, {$pull: {comments:{_id: commentId}}},{new: true, runValidators: true});

    if(!deleteComment){
        res.status(400).json({
            message:'cannot update the comment'
        })
    }

    res.status(200).json({
        message:'comment deleted successfully'
    })
}

async function getAllTask(req,res){
    const allTasks = taskSchema.find();
    res.status(200).json({
        message: 'all tasks fetched successfully', allTasks
    })
}

async function getTaskByWorkspace(req,res){
    const workspaceId = req.params.id;

    if(!workspaceId){
        res.status(400).json({
            message: 'workspace id required'
        })
    }

    const tasks = await taskSchema.find({workspace: workspaceId});

    if(!tasks){
        res.status(200).json({
            message: 'No task found'
        })
    }

    res.status(200).json({
        message: 'tasks fetched successfully', tasks
    })
}

async function getTaskById(req,res){
    const taskId = req.params.id;

    if(!taskId){
        res.status(400).json({
            message: 'task id not found'
        })
    }

    const task = await taskSchema({_id: taskId})
    
    if(!task){
        res.status(200).json({
            message: 'No task found'
        })
    }

    res.status(200).json({
        message: 'task fetched successfully', task
    })

}

module.exports={
    createTask,
    deleteTask,
    updateTask,
    addComment,
    deleteComment,
    getAllTask,
    getTaskByWorkspace,
    getTaskById
}