const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, updateUserPassController, getAllUserController, deleteUserController, updateUserDetailController} = require('../controllers/userController');

router.post('/register', registerUserController);    
router.delete('/:id', deleteUserController);                                 //add product by body                             //add product by body
router.get('/', getAllUserController);                                 //add product by body                             //add product by body
router.put('/:id', updateUserPassController);                                 //add product by body                             //add product by body
router.put('/update/:id', updateUserDetailController);                                 //add product by body                             //add product by body
router.post('/login', loginUserController);

module.exports = router;