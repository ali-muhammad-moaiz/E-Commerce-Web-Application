const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, logoutUserController, updateUserPassController, getAllUserController, deleteUserController, updateUserDetailController} = require('../controllers/userController');
const {isAuthenticUser} = require('../middlewares/auth.js');

router.post('/register', registerUserController);    
router.delete('/:id', isAuthenticUser, deleteUserController);                                 //add product by body                             //add product by body
router.get('/', getAllUserController);                                 //add product by body                             //add product by body
router.put('/:id', updateUserPassController);                                 //add product by body                             //add product by body
router.put('/update/:id', isAuthenticUser, updateUserDetailController);                                 //add product by body                             //add product by body
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);

module.exports = router;