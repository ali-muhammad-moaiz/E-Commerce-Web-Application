const express = require('express');
const router = express.Router();
const {createNewProductController, getProductsByDetailsController, getAllProductsController, updateProductController, deleteProductController} = require('../controllers/productController');

router.post('/new', createNewProductController);
router.get('/products', getAllProductsController);
router.put('/:id', updateProductController)
router.delete('/:id', deleteProductController);                                 //access by parameter
router.get('' , getProductsByDetailsController);                                //access by query

module.exports = router;