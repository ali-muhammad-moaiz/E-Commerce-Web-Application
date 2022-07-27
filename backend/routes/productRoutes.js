const express = require('express');
const router = express.Router();
const {createNewProductController, getProductByPriceRangeKeyController, getProductByIdController, getProductByKeywordController, updateProductController, deleteProductController} = require('../controllers/productController');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

//isAuthenticUser authenticate the user and authorizeRoles validates user's right to access a resource

router.post('/new', isAuthenticUser, authorizeRoles("admin"), createNewProductController);      //add product by body
router.put('/:id', isAuthenticUser, authorizeRoles("admin"), updateProductController);         //access by parameter
router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteProductController);      //access by parameter
router.get('' , getProductByIdController);                                                     //access by query
router.get('/search', getProductByKeywordController);
router.get('/search/price', getProductByPriceRangeKeyController);

module.exports = router;