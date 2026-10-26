const projectModel = require('../models/project.model');

async function createProject(req, res){
    const {name, description, workspace, startDate, dueDate, status} = req.body;

    if(!name || !description){
        return res.status(400).json({
            message: "Fill the required fields"
        })
    }

    if(await projectModel.findOne({name: name})){
        return res.status(400).json({
            message: "project with this name already exists"
        })
    }

    const project = await projectModel.create({
        name: name,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        status: status,
        workspace: workspace,
        createdBy: req.user._id,
        updatedAt: Date.now()
    });

    return res.status(200).json({
        message: "project created successfully", project
    });
}

async function deleteProject(req, res){
    const name = req.params.name;
    if(!name){
        return res.status(400).json({
            message: "Name is required"
        })
    }

    const project = await projectModel.findOneAndDelete({name:name});

    if(!project){
        return res.status(404).json({
            message: "Project not found"
        })
    }

    return res.status(200).json({
        message: "Project deleted successfully"
    })
}

async function updateProject(req, res){
    const projectId = req.params.id;

    if(!projectId){
        return res.status(400).json({
            message: "Project Id is required"
        })
    }

    if(req.user._id.toString() !== (await projectModel.findById(projectId)).createdBy.toString()){
        return res.status(403).json({
            message: "You are not authorised to edit this project"
        });
    }

    const project = await projectModel.findByIdAndUpdate({_id: projectId}, req.body, {new: true, runValidators: true})

    return res.status(200).json({
        message: "Project updated successfully", project: project
    })

}

async function getAllProjects(req, res){
    const allProjects = await projectModel.find();

    return res.status(200).json({
        message: "Projects fetched successfully",
        projects: allProjects
    })
}

async function getProjectByName(req, res){
    const name = req.params.name;

    if(!name){
        return res.status(400).json({
            message: "Name is required"
        })
    }

    const project = await projectModel.findOne({name});

    if(!project){
        return res.status(400).json({
            message: "Project not found"
        })
    }

    return res.status(200).json({
        message: "Project fetched successfully",
        project: project
    })
}

async function getMyProjects(req, res){
    const userId = req.user._id;

    if(!userId){
        return res.status(400).json({
            message: "User ID is required"
        })
    }

    const myProjects = await projectModel.find({createdBy: userId});

    return res.status(200).json({
        message: "Projects fetched successfully",
        projects: myProjects
    })
}

async function getProjectByWorkspace(req, res){
    const workspaceId = req.params.workspaceId

    if(!workspaceId){
        return res.status(400).json({
            message: "Please Specify the workspace"
        })
    }

    const projects = await projectModel.find({workspace: workspaceId})

    return res.status(200).json({
        message: "Projects fetched",
        projects: projects
    })

}

module.exports = {
    createProject,
    deleteProject,
    updateProject,
    getAllProjects,
    getProjectByName,
    getMyProjects,
    getProjectByWorkspace
}