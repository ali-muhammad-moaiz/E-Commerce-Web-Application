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

function authorizeRoles(...roles){       
    //checking whether our passed role is present in the request or not?
    return(req, res, next) =>{    
        if(!roles.includes(req.user.role)){
            return res.status(403).json({'message':`This resource is not allowed to access with '${req.user.role}' role!`});    
        }   
        next();
    };
}

module.exports.isAuthenticUser = isAuthenticUser;
module.exports.authorizeRoles = authorizeRoles;
