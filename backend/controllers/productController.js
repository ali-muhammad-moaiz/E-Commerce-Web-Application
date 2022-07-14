const express = require('express');
const {addNewProduct, getProductsByKeywordCategory , findProduct, deleteProduct, updateProduct} = require('../services/productService');

const result2 = "Product Not found!";

const getProductByKeywordCategoryController = async (req, res, next)=>{     
    const {opt} = req.query;
    /* opt = 1=>search by keyword | opt=0, search by category */

    const result = await getProductsByKeywordCategory(req.query, opt);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const getProductByIdController = async (req, res, next) =>{
    const {id} = req.query;
    
    const result = await findProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    
    return res.status(200).json({'message':result});
    
}

const createNewProductController = async (req, res) =>{
    const {product} = req.body;

    const result = await addNewProduct(product);
    
    console.log("Product added in database.");
    if(!result)
        return res.status(400).json({'message':result2});
    return res.status(201).json({'message':result});
}

const deleteProductController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await deleteProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});

    console.log("Product deleted from database.");
    return res.status(200).json({'message':result});
    
}

const updateProductController = async (req, res, next) =>{
    const {id} = req.params;
    const {updates} = req.body;

    const result = await updateProduct(id, updates);
    if(!result)
        return res.status(404).json({'message':result2});

    console.log("Product updated in database.");
    return res.status(200).json({'message':result});
}

module.exports.createNewProductController = createNewProductController;

module.exports.getProductByIdController = getProductByIdController;
module.exports.getProductByKeywordCategoryController = getProductByKeywordCategoryController;

module.exports.updateProductController = updateProductController;
module.exports.deleteProductController = deleteProductController;

