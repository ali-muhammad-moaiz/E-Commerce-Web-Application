const express = require('express');
const router = express.Router();
const {createNewProductController, getProductByIdController, getProductByKeywordCategoryController, updateProductController, deleteProductController} = require('../controllers/productController');

router.post('/new', createNewProductController);                                 //add product by body

router.put('/:id', updateProductController);                                     //access by parameter
router.delete('/:id', deleteProductController);                                  //access by parameter

router.get('/products', getProductByKeywordCategoryController);             //access by params & query
router.get('' , getProductByIdController);                                       //access by query
                            
module.exports = router;