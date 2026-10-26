const taskModel = require('../models/task.model');
const taskSchema = require('../models/task.model')

async function createTask(req,res){
    const {title, project, description, assignee, comments, status, priority} = req.body;

    if(!title){
        return res.status(400).json({
            message: 'Title is required'
        });
    }

    if(await taskSchema.findOne({title})){return res.status(400).json({message:"task already exists"})}

    const task = await taskSchema.create({
        title: title,
        description: description,
        assignee: assignee,
        comments: comments,
        createdBy: req.user._id,
        status: status,
        priority: priority,
        project: project

    })

    return res.status(200).json({
        message: 'Task created successfully',
        task
    })
}

async function deleteTask(req,res){
    const taskId = req.params.id;

    if(!taskId){
        return res.status(400).json({
            message: 'task id not found'
        })
    }

    const task = taskModel.findByIdAndDelete(taskId);

    if(!task){
        return res.status(400).json({
            message: 'task not found'
        })
    }

    return res.status(200).json({
        message: 'task deleted successfully'
    })

}

async function updateTask(req,res){
    const taskId = req.params.id;

    if(!taskId){
        return res.status(400).json({
            message: 'task id not found'
        })
    }

    const taskUpdate = await taskSchema.findOneAndUpdate({_id: taskId}, req.body, {new: true, runValidators: true})

    if(!taskUpdate){
        return res.status(400).json({
            message: 'task not found'
        })
    }

    return res.status(200).json({
        message: 'task updated successfully', taskUpdate
    })
}

async function addComment(req,res){
    const {text} = req.body;
    const {taskId} = req.params;

    if(!text){
        return res.status(400).json({
            message: 'cannot submit empty comment'
        })
    }

    const task = await taskSchema.findById(taskId)

    if(!task){
        return res.status(400).json({
            message:'task not found'
        })
    }

    task.comments.push({text, createdBy: req.user._id })
    await task.save()

    return res.status(201).json({message:'comment added', comments:task.comments})
}

async function deleteComment(req,res){
    const {taskId, commentId} = req.params;

    if(!commentId || !taskId){
        return res.status(400).json({
            message: 'enter id'
        })
    }

    const deleteComment = await taskSchema.findOneAndUpdate({_id: taskId}, {$pull: {comments:{_id: commentId}}},{new: true, runValidators: true});

    if(!deleteComment){
        return res.status(400).json({
            message:'cannot update the comment'
        })
    }

    return res.status(200).json({
        message:'comment deleted successfully'
    })
}

async function getAllTask(req,res){
    const allTasks = await taskSchema.find();
    return res.status(200).json({
        message: 'all tasks fetched successfully', allTasks
    })
}

async function getTaskByProject(req,res){
    const projectId = req.params.id;

    if(!projectId){
        return res.status(400).json({
            message: 'project id required'
        })
    }

    const tasks = await taskSchema.find({project: projectId});

    if(tasks.length == 0){
        return res.status(200).json({
            message: 'No task found'
        })
    }

    return res.status(200).json({
        message: 'tasks fetched successfully', tasks
    })
}

async function getTaskById(req,res){
    const taskId = req.params.id;

    if(!taskId){
        return res.status(400).json({
            message: 'task id not found'
        })
    }

    const task = await taskSchema({_id: taskId})
    
    if(!task){
        return res.status(200).json({
            message: 'No task found'
        })
    }

    return res.status(200).json({
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
    getTaskByProject,
    getTaskById
}