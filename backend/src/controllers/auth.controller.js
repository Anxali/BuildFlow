const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res){
    const { name, email, password } = req.body;

    if(await userModel.findOne({email})){
        return res.status(400).json({
            message: "Cannot register user"
        })
    }

    const user = await userModel.create({name, email, password: await bcrypt.hash(password, 10)});

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(201).json({
        message: "User registered successfully", user
    })
}

async function loginUser(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(200).json({
        message: "Login successful"
    })
}

async function logoutUser(req,res){
    res.clearCookie('token');
    res.status(200).json({
        message: "Logout successful"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};