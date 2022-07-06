const express = require('express');
const {getAllProductsService} = require('../services/productService');

const getAllProductsController = async (req, res)=>{
    const result = await getAllProductsService();
    return res.status(200).json({message: result});
}

module.exports.getAllProducts = getAllProductsController;