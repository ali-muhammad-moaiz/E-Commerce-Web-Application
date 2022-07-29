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
            },
            role: newUser.role
        }
    );

    try{
        const user = await addUser.save();
        if(user){
            const result = user;
            return result;
        }
        
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

const updateUserPass = async (userTmp, newPass)=>{
    const id = userTmp._id;
    const updates = {password: newPass};
    const updatedObj = await User.findOneAndUpdate({ _id: id}, updates, );
    console.log(updatedObj)
    if(updatedObj){
        return updatedObj;
    }
}

const changePassword = async (validToken, newPass) =>{
    const updates = {password: newPass};
    const updatedObj = await User.findOneAndUpdate( {resetPasswordToken: validToken}, updates );
    if(updatedObj){
        return updatedObj;
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

const updateUserWithToken = async (objTemp) =>{
    const updatedObj = await User.findOneAndUpdate({ _id: objTemp._id}, objTemp, {new:true}).select("+password");
    if(updatedObj){
        return updatedObj;
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
        if(check)
            return validEmail;
    } 
}

const findUserByEmail = async (email) => {
    const validUser = await User.findOne({email});
    if(validUser){
        return validUser;
    }
}

module.exports.validateCredentials = validateCredentials;
module.exports.addNewUser = addNewUser;
module.exports.deleteUser = deleteUser;
module.exports.getAllUser = getAllUser;
module.exports.updateUserPass = updateUserPass;
module.exports.updateUserDetail = updateUserDetail;
module.exports.findUserByEmail = findUserByEmail;
module.exports.updateUserWithToken = updateUserWithToken;
module.exports.changePassword = changePassword;