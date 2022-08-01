const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, deleteProfileController, updateUserRoleController, getPersonalDetailsController, updateUserPasswordController, logoutUserController, forgetPassword, getAllUserController, deleteUserController, updateUserProfileController, changePasswordController} = require('../controllers/userController');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteUserController);
router.get('/',  isAuthenticUser, authorizeRoles("admin"), getAllUserController);                                                 
router.put('/update/role/:id', isAuthenticUser, authorizeRoles("admin"), updateUserRoleController);

router.post('/register', registerUserController);  
router.put('/profile/update', isAuthenticUser, updateUserProfileController);
router.delete('/profile/delete', isAuthenticUser, deleteProfileController);
router.post('/forget', forgetPassword);    
router.put('/forget/password/update/:token', changePasswordController);
router.put('/password/update', isAuthenticUser, updateUserPasswordController);                                                        

router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);
router.get('/profile/info', isAuthenticUser, getPersonalDetailsController);


module.exports = router;