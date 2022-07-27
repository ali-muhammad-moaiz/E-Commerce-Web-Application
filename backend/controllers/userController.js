const {addNewUser, validateCredentials, deleteUser, getAllUser, updateUserPass, updateUserDetail} = require('../services/userService');
const result2 = "No such user exists!";
const bcrypt = require('bcryptjs');
const {getToken} = require('../utils/jwttoken');
const { findById } = require('../models/userModel');

const registerUserController = async (req, res) =>{
    const {user} = req.body;
    user.password = await bcrypt.hash(user.password, 12);
    const result = await addNewUser(user);
    
    if(!result || !result.email)
        return res.status(400).json({'message':"Unable to add the user!"});
    
    const token_options = await getToken(result);     //result is payload for token
    const token = token_options[0];
    const options = token_options[1];

    return res.status(201).cookie('token', token, options).json({success: true, result, token}); 
}

const deleteUserController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await deleteUser(id);
    if(!result)
        return res.status(404).json({'message':result2});

    console.log("Product deleted from database.");
    return res.status(200).json({'message':result}); 
}

const updateUserPassController = async (req, res, next) =>{
    const {password} = req.body;
    const {id} = req.params;

    hashedPass = await bcrypt.hash(password, 12);
    const result = await updateUserPass(id, hashedPass);

    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result}); 
}

const updateUserDetailController = async (req, res, next) =>{
    const {name, email} = req.body;
    const {id} = req.params;

    const result = await updateUserDetail(id, name, email);

    if(!result)
        return res.status(404).json({'message':result2});

    const token_options = await getToken(result);     //valid is payload for token
    const token = token_options[0];
    const options = token_options[1];
    
    return res.status(201).cookie('token', token, options).json({success: true, result, token});
}

const getAllUserController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await getAllUser(id);
    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result}); 
}

const loginUserController = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(401).json({'message':"Please enter email and password both!"});
    
    const valid = await validateCredentials(email, password);

    if(!valid)
        return res.status(401).json({'message':"Please Enter valid Credentials!"});

    const token_options = await getToken(valid);     //valid is payload for token
    const token = token_options[0];
    const options = token_options[1];

    return res.status(201).cookie('token', token, options).json({success: true, valid, token});
}

const logoutUserController = async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    return res.status(200).json({success: true, message: "Logged out successfully."});
}

module.exports.registerUserController = registerUserController;
module.exports.loginUserController = loginUserController;
module.exports.logoutUserController = logoutUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.updateUserPassController = updateUserPassController;
module.exports.updateUserDetailController = updateUserDetailController;
module.exports.getAllUserController = getAllUserController;