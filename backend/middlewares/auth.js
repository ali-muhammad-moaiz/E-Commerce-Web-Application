const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

const isAuthenticUser = async (req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({'message':"Please login to continue!"});    
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const User = await user.findById(decodedData.id);

    req.user = User;
    next();
}

module.exports.isAuthenticUser = isAuthenticUser;