const express = require('express');
const router = express.Router();
const {createNewProductController, getProductsByIdController, searchProductController, updateProductController, deleteProductController} = require('../controllers/productController');

router.post('/new', createNewProductController);
router.get('/products', searchProductController);
router.put('/:id', updateProductController)
router.delete('/:id', deleteProductController);                                 //access by parameter
router.get('' , getProductsByIdController);                                //access by query

module.exports = router;