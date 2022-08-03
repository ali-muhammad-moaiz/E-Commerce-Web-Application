const {addNewUser, validateCredentials, deleteUser, getAllUser, updateRole, findUserById, updateUserPass, changePassword, updateUserWithToken, updateUserDetail, findUserByEmail} = require('../services/userService');
const {getAllProducts_vendor} = require('../services/productService.js');
const bcrypt = require('bcryptjs');
const {getToken} = require('../utils/jwttoken');
const {sendEmail} = require('../utils/sendEmail');
const result2 = "No such user exists!";

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

const deleteUserController = async (req, res) =>{     //by admin
    const {id} = req.params;
    const result = await deleteUser(id);
    if(!result)
        return res.status(404).json({'message':result2});
 
    return res.status(204).json({'message':result}); 
}

const updateUserRoleController = (req, res) =>{
    const {role} = req.body;
    const id = req.params.id;
    const result = updateRole(id, role);
    if(!result){
        return res.status(404).json({'message':result2});
    }
    return res.status(204).json({'message':result}); 
}

const deleteProfileController = async (req, res) => {       //by the user himself
    if(req.user){
        const id = req.user.id;
        const result = await deleteUser(id);
        if(!result)
            return res.status(404).json({'message':result2});

        res.clearCookie('token');
        console.log("User deleted from database.");
        return res.status(204).json({'message':result}); 
    }
    return res.status(404).json({'message': "Something went wrong!"});
}

const getPersonalDetailsController = async(req, res) => {
    const id = req.user._id;
    const result = await findUserById(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({success: true, result});
}

const updateUserProfileController = async (req, res) =>{
    const {name, email} = req.body;
    const id = req.user.id;
    const result = await updateUserDetail(id, name, email);
    if(!result){
        return res.status(401).json({'message':"Something went wrong!"});
    }

    const token_options = await getToken(result);     //valid is payload for token
    const token = token_options[0];
    const options = token_options[1];
    return res.status(204).cookie('token', token, options).json({success: true, result, token});
}

const updateUserPasswordController = async (req, res) =>{
    const {oldPassword, newPassword, confirmPassword} = req.body;
    if(newPassword == confirmPassword){
        const hashedPass = await bcrypt.hash(newPassword, 12);
        const result = await updateUserPass(req.user.id, oldPassword, hashedPass);
        if(!result ){
            return res.status(404).json({'message':result2});
        }else if( result &&  !result.email){
            return res.status(401).json({'message':result});
        }

        const token_options = await getToken(result);     //result is payload for token
        const token = token_options[0];
        const options = token_options[1];
        return res.status(204).cookie('token', token, options).json({success: true, result, token});
    }
    return res.status(401).json({'message': "Both passwords are not same!"});
}

const getAllUserController = async (req, res) =>{
    const result = await getAllUser();
    if(!result)
        return res.status(404).json({'message':"No users exists!"});
    return res.status(200).json({'message':result}); 
}

const loginUserController = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password)
        return res.status(401).json({'message':"Please enter email and password both!"});
    const valid = await validateCredentials(email, password);
    if(!valid)
        return res.status(401).json({'message':"Please Enter valid Credentials!"});

    const token_options = await getToken(valid);
    const token = token_options[0];
    const options = token_options[1];
    return res.status(200).cookie('token', token, options).json({success: true, valid, token});
}

const logoutUserController = async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    return res.status(200).json({success: true, message: "Logged out successfully."});
}

const forgetPassword = async (req, res) =>{
    const modifyUser = await findUserByEmail(req.body.email);
    if(modifyUser){
        await modifyUser.getPasswordResetToken();
        const updatedUser = await updateUserWithToken(modifyUser);
        if(!updatedUser){
            return res.status(500).json({'message':result2});
        }
   
        let url = `${req.protocol}://${req.get("host")}/api/user/updatePassword/${updatedUser.resetPasswordToken}`;
        //`http://localhost:PORT#/api/user/updatePassword/${updatedUser.resetPasswordToken}`;
        sendEmail(url, modifyUser.email);
        return res.status(200).json({'message':"Mail sent!"});           
    }
    return res.status(404).json({'message':result2});
}

const changePasswordController = async (req, res) =>{
    const password = req.body.password;
    if(password != req.body.confirmPassword){
        return res.status(422).json({'message': "Passwords are not same!"});
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const result = await changePassword(req.params.token, hashedPass);
    if(!result){
        return res.status(500).json({'message':"Something went wrong!"});
    }
    result.resetPasswordExpire = undefined;
    result.resetPasswordToken = undefined;
    result.save();

    const token_options = await getToken(result);     //valid is payload for token
    const token = token_options[0];
    const options = token_options[1];
    return res.status(204).cookie('token', token, options).json({success: true, result, token});
}

const totalSellingController = async (req, res) =>{     //to get all the products sold by vendor
    const adminId = req.user._id;
    const products = await getAllProducts_vendor(adminId);
    if(products.length === 0){
        return res.status(404).json({'message':"You haven't sold any items yet."});
    }
    return res.status(200).json({products});
}

module.exports.totalSellingController = totalSellingController;
module.exports.registerUserController = registerUserController;
module.exports.loginUserController = loginUserController;
module.exports.logoutUserController = logoutUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.updateUserProfileController = updateUserProfileController;
module.exports.getAllUserController = getAllUserController;
module.exports.forgetPassword = forgetPassword;
module.exports.changePasswordController = changePasswordController;
module.exports.getPersonalDetailsController = getPersonalDetailsController;
module.exports.updateUserPasswordController = updateUserPasswordController;
module.exports.deleteProfileController = deleteProfileController;
module.exports.updateUserRoleController = updateUserRoleController;