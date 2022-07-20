const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const addNewUser = async (newUser) => {
    const addUser = new User(
        {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            avatar:{
                public_id: "SampleID",
                url: "profilePictureUrl"
            }
        }
    );

    const token = addUser.getJWTToken();

    try{
        const user = await addUser.save();
        result = [];
        
        result.push(user);
        result.push(token);
        return result;
    }catch(err){
        return "Please input all the required data.";
    }
}

const deleteUser = async (id)=>{
    try{
        const deletedObj = await User.findOneAndDelete({ _id: id });
        return deletedObj;
    }catch(err){
        return "User not found!";
    }
}

const updateUserPass = async (id, newPass)=>{
    try{
        const updates = { $set: {password: newPass} };
        const updatedObj = await User.findOneAndUpdate({ _id: id}, updates, {new:true});
        return updatedObj;
    }catch(err){
        return "User not found!";
    }
}

const updateUserDetail = async (id, updatedName, updatedEmail)=>{
    try{
        const updates = { $set: {name: updatedName, email: updatedEmail} };
        const updatedObj = await User.findOneAndUpdate({ _id: id}, updates, {new:true});
        return updatedObj;
    }catch(err){
        return "User not found!";
    }
}

const getAllUser = async ()=>{
    try{
        const Obj = await User.find();
        return Obj;
    }catch(err){
        return "No users found!";
    }
}

const validateCredentials = async (email, password) => {
    const validEmail = await User.findOne({email}).select("+password");

    if(validEmail){
        const check = bcrypt.compareSync(password, validEmail.password);
        if(check){
            const token = validEmail.getJWTToken();
            return token;
        }
    }   
}

module.exports.validateCredentials = validateCredentials;
module.exports.addNewUser = addNewUser;
module.exports.deleteUser = deleteUser;
module.exports.getAllUser = getAllUser;
module.exports.updateUserPass = updateUserPass;
module.exports.updateUserDetail = updateUserDetail;