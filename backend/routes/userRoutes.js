const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, logoutUserController, forgetPassword, getAllUserController, deleteUserController, updateUserDetailController} = require('../controllers/userController');
const {isAuthenticUser} = require('../middlewares/auth.js');

router.post('/register', registerUserController);    
router.delete('/:id', isAuthenticUser, deleteUserController);                                                      
router.get('/', getAllUserController);                                                 
router.put('/forget', forgetPassword);                                                             
router.put('/update/:id', isAuthenticUser, updateUserDetailController);                                                        
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);

module.exports = router;