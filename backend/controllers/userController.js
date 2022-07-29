const {addNewUser, validateCredentials, deleteUser, getAllUser, updateUserPass, changePassword, updateUserWithToken, updateUserDetail, findUserByEmail} = require('../services/userService');
const result2 = "No such user exists!";
const bcrypt = require('bcryptjs');
const {getToken} = require('../utils/jwttoken');
const {sendEmail} = require('../utils/sendEmail');

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

        sendEmail(url);
        return res.status(200).json({'message':"Mail sent!"});           
    }
    return res.status(404).json({'message':result2});
}

const changePasswordController = async (req, res) =>{
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password, 12);
    const result = await changePassword(req.params.token, hashedPass);
    if(!result){
        return res.status(500).json({'message':"Something went wrong!"});
    }
    return res.status(200).json({success: true, result}); 

}

module.exports.registerUserController = registerUserController;
module.exports.loginUserController = loginUserController;
module.exports.logoutUserController = logoutUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.updateUserDetailController = updateUserDetailController;
module.exports.getAllUserController = getAllUserController;
module.exports.forgetPassword = forgetPassword;
module.exports.changePasswordController = changePasswordController;
