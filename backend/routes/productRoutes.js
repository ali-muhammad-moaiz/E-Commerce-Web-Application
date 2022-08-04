const express = require('express');
const router = express.Router();
const {createNewProductController, addReviewController, getProductReviewsController, deleteReviewController, getProductByPriceRangeKeyController, getProductByIdController, getProductByKeywordController, updateProductController, deleteProductController} = require('../controllers/productController');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

//isAuthenticUser authenticate the user and authorizeRoles validates user's right to access a resource
router.post('/new', isAuthenticUser, authorizeRoles("admin"), createNewProductController);   //add product by body
router.get('' , getProductByIdController);                                                   //access by query
router.get('/search', getProductByKeywordController);
router.get('/search/price', getProductByPriceRangeKeyController);
router.get('/reviews', getProductReviewsController);
router.put('/reviews/add', isAuthenticUser, addReviewController);                            //add by query
router.put('/reviews/delete', isAuthenticUser, deleteReviewController);
router.put('/:id', isAuthenticUser, authorizeRoles("admin"), updateProductController);       //access by parameter
router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteProductController); 

module.exports = router;