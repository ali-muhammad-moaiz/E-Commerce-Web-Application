const express = require('express');
const router = express.Router();
const {createNewProductController, getProductByIdController, getProductByKeywordController, updateProductController, deleteProductController} = require('../controllers/productController');

router.post('/new', createNewProductController);                                 //add product by body

router.put('/:id', updateProductController);                                     //access by parameter
router.delete('/:id', deleteProductController);                                  //access by parameter

router.get('' , getProductByIdController);                                       //access by query
     
router.get('/search', getProductByKeywordController);
module.exports = router;