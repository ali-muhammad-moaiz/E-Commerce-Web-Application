const express = require('express');

const getAllProducts = async (req, res)=>{
    res.status(200).json({message: "The function is working fine!"});
}

module.exports = {getAllProducts};