const {addNewUser, deleteUser, getAllUser, updateUserPass, updateUserDetail} = require('../services/userService');
const result2 = "No such user exists!";
const bcrypt = require('bcryptjs');

const registerUserController = async (req, res) =>{
    const {user} = req.body;
    console.log(user.password);
    user.password = await bcrypt.hash(user.password, 12);
    console.log(user.password);
    const result = await addNewUser(user);
    
    console.log("User added in database.");
    if(!result)
        return res.status(400).json({'message':result2});
    return res.status(201).json({'message':result});
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

    return res.status(200).json({'message':result}); 
}

const getAllUserController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await getAllUser(id);
    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result}); 
}

module.exports.registerUserController = registerUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.updateUserPassController = updateUserPassController;
module.exports.updateUserDetailController = updateUserDetailController;
module.exports.getAllUserController = getAllUserController;