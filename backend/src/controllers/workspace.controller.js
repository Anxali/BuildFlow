const workspaceModel = require('../models/workspace.model');

async function createWorkspace(req, res) {
    const {name, description, members} = req.body;

    if(!name){
        return res.status(400).json({
            message: "Name is required"
        })
    } 

    if(await workspaceModel.findOne({name})){
        return res.status(400).json({
            message: "Workspace with this name already exists"
        })
    }

    const workspace = await workspaceModel.create({
        name,
        description,
        owner:req.user._id,
        members,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.status(201).json({
        message: "Workspace created successfully", workspace
    })
}

async function deleteWorkspace(req, res){
    const name = req.params.name;

    if(!name){
        return res.status(400).json({
            message: "Name is required"
        })
    }

    const workspace = await workspaceModel.findOneAndDelete({name});

    if(!workspace){
        return res.status(404).json({
            message: "Workspace not found"
        })
    }

    res.status(200).json({
        message: "Workspace deleted successfully"
    })
}

async function getAllWorkspaces(req, res){
    const allWorkspaces = await workspaceModel.find();
    res.status(200).json({
        message: "Workspaces fetched successfully",
        workspaces: allWorkspaces
    })
}

async function getWorkspaceByName(req, res){
    const workspaceName = req.params.name;

    if(!workspaceName){
        return res.status(400).json({
            message: "Name is required"
        })
    }

    const workspace = await workspaceModel.findOne({name: workspaceName});

    if(!workspace){
        return res.status(404).json({
            message: "Workspace not found"
        })
    }

    res.status(200).json({
        message: "Workspace fetched successfully",
        workspace
    })
}

async function updateWorkspace(req, res){
    const workspaceId = req.params.id;

    if(!workspaceId){
        return res.status(400).json({
            message: "Workspace ID is required"
        })
    }

    if(req.user._id.toString() !== req.body.owner){
        return res.status(403).json({
            message: "You are not authorized to update this workspace"
        })
    }

    const workspace = await workspaceModel.findOneAndUpdate({_id: workspaceId}, req.body, {new: true, runValidators: true});

    if(!workspace){
        return res.status(404).json({
            message: "Workspace not found"
        })
    }
    
    res.status(200).json({
        message: "Workspace updated successfully",
        workspace
    })

}

async function getMyWorkspaces(req, res){
    const userId = req.user._id;

    if(!userId){
        return res.status(400).json({
            message: "User ID is required"
        })
    }

    const myWorkspaces = await workspaceModel.find({owner: userId});

    if(!myWorkspaces){
        res.status(200).json({
            message: 'No workspaces found'
        })
    }

    res.status(200).json({
        message: "My workspaces fetched successfully",
        workspaces: myWorkspaces
    })


}

module.exports = {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    getWorkspaceByName,
    updateWorkspace,
    getMyWorkspaces
}