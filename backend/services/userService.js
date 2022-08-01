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

const updateRole = async (id, role) =>{
    const updates = {"role":role};

    const updatedObj = await User.findOneAndUpdate( {id: id}, updates );
    if(updatedObj){
        return updatedObj;
    }
}

const updateUserPass = async (id, oldPass, newPass)=>{
    const isExisting = await User.findOne({_id: id}).select("+password");
    if( isExisting ){
        const isVerified = await bcrypt.compare(oldPass, isExisting.password);
        if(isVerified){
            const updates = {"password": newPass};
            const updatedObj = await User.findOneAndUpdate({ _id: id}, updates);
            if(updatedObj){
                return updatedObj;
            }
        }else{
            return "Old password is incorrect!";
        }
    }
}

const changePassword = async (validToken, newPass) =>{
    const updates = {password: newPass};
    const toBeUpdated = await User.findOne( {resetPasswordToken: validToken});
    if(toBeUpdated){
        if(toBeUpdated.resetPasswordExpire < Date.now()){
            return;
        }
        const updatedObj = await User.findOneAndUpdate( {resetPasswordToken: validToken}, updates );
        if(updatedObj){
            return updatedObj;
        }
    }
}

const updateUserDetail = async (id, updatedName, updatedEmail)=>{
    try{
        const updates = {"name": updatedName, "email": updatedEmail};
        const updatedObj = await User.findOneAndUpdate({ _id: id}, updates, {runValidators: true, new:true});
        return updatedObj;
    }catch(err){
        console.log(err);
    }
}

const updateUserWithToken = async (objTemp) =>{
    const updatedObj = await User.findOneAndUpdate({ _id: objTemp._id}, objTemp, {new:true}).select("+password");
    if(updatedObj){
        return updatedObj;
    }
}

const findUserById = async(id) =>{
    try{
        const user = await User.findOne( {_id : id});
        if(user)
            return user;
    }catch(err){
        console.log(err);
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
module.exports.findUserById = findUserById;
module.exports.updateRole = updateRole;