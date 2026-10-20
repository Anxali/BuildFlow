const userModel = require('../models/user.model');

async function registerUser(req, res){
    const { username, password } = req.body;

    if(await userModel.findOne({username})){
        return res.status(400).json({
            message: "Cannot register user"
        })
    }

    const user = await userModel.create({username, password});

    res.status(201).json({
        message: "User registered successfully", user
    })
}

async function loginUser(req, res){
    const {username, password} = req.body;

    const user = await userModel.findOne({username});

    if(!user || user.password !== password){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.status(200).json({
        message: "Login successful"
    })
}

module.exports = {
    registerUser,
    loginUser
};