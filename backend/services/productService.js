const express = require('express');

const getAllProductsService = async (req, res)=>{
    const message = "This function is working fine!";
    return message;
}

module.exports.getAllProductsService = getAllProductsService;
