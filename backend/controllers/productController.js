const express = require('express');
const {addNewProduct, getAllProducts, findProduct, deleteProduct, updateProduct} = require('../services/productService');

const result2 = "Not found!";

const getAllProductsController = async (req, res, next)=>{
    const result = await getAllProducts();
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const getProductsByDetailsController = async (req, res, next) =>{
    const {id} = req.query;

    const result = await findProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    
    return res.status(200).json({'message':result});
    
}

const createNewProductController = async (req, res) =>{
    const {product} = req.body;

    const result = await addNewProduct(product);
    
    console.log("Product Added Successfully!");
    if(!result)
        return res.status(400).json({'message':result2});
    return res.status(201).json({'message':result});
}

const deleteProductController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await deleteProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
    
}

const updateProductController = async (req, res, next) =>{
    const {id} = req.params;
    const {updates} = req.body;

    const result = await updateProduct(id, updates);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

module.exports.createNewProductController = createNewProductController;

module.exports.getAllProductsController = getAllProductsController;
module.exports.getProductsByDetailsController = getProductsByDetailsController;

module.exports.updateProductController = updateProductController;
module.exports.deleteProductController = deleteProductController;

