const workspaceModel = require('../models/workspace.model');

async function createWorkspace(req, res) {
    const {name, description, owner, members} = req.body;

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
        owner,
        members,
        createdBy: req.user._id,
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

module.exports = {
    createWorkspace,
    deleteWorkspace,
}