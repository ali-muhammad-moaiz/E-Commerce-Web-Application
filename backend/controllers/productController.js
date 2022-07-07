const express = require('express');
const {addNewProduct, getAllProducts, findProduct, deleteProduct, updateProduct} = require('../services/productService');

const getAllProductsController = async (req, res)=>{
    const result = await getAllProducts();
    return res.status(200).json({message: result});
}

const getProductsByDetailsController = async (req, res) =>{
    const {id} = req.query;

    const result = await findProduct(id);
    if(!result)
        return res.status(404).json({message: result});
    return res.status(200).json({message: result});
}

const createNewProductController = async (req, res) =>{
    const {product} = req.body;

    const result = await addNewProduct(product);
    
    console.log("Product Added Successfully!");
    return res.status(200).json({message: result});
}

const deleteProductController = async (req, res) =>{
    const {id} = req.params;

    const result = await deleteProduct(id);
    if(!result)
        return res.status(404).json({message: result});
    
    console.log("Product Deleted Successfully!");
    return res.status(200).json({message: result});
}

const updateProductController = async (req, res) =>{
    const {id} = req.params;
    const {updates} = req.body;

    const result = await updateProduct(id, updates);
    if(!result)
        return res.status(404).json({message: result});
    
    console.log("Product updated Successfully!");
    return res.status(200).json({message: result});
}

module.exports.createNewProductController = createNewProductController;

module.exports.getAllProductsController = getAllProductsController;
module.exports.getProductsByDetailsController = getProductsByDetailsController;


module.exports.updateProductController = updateProductController;
module.exports.deleteProductController = deleteProductController;

