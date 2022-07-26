const express = require('express');
const router = express.Router();
const {createNewProductController, getProductByPriceRangeKeyController, getProductByIdController, getProductByKeywordController, updateProductController, deleteProductController} = require('../controllers/productController');
const {isAuthenticUser} = require('../middlewares/auth.js');

router.post('/new', createNewProductController);                                 //add product by body

router.put('/:id', updateProductController);                                     //access by parameter
router.delete('/:id', deleteProductController);                                  //access by parameter

router.get('' , getProductByIdController);                                       //access by query
     
router.get('/search', isAuthenticUser, getProductByKeywordController);
router.get('/search/price', getProductByPriceRangeKeyController);

module.exports = router;