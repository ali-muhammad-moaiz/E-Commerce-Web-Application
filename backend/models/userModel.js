const mongoose = require('mongoose');
const validator= require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name: "],
        maxLength : [30, "Name can't exceed 30 characters!"],
        minLength : [5, "Name should contain at least 5 characters."]
    },
    email: {
        type: String,
        required: [true, "Enter your email: "],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your Password: "],
        minLength : [8, "Password should contain at least 8 characters."],
        select: false           //just to prevent user's assword to retrieve from database
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
            url: {
            type: String,
            required: true
        } 
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});
    
userSchema.methods.getJWTToken = function(){
    const token = jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXP,
    });
    return token;
}

module.exports = mongoose.model("User", userSchema);