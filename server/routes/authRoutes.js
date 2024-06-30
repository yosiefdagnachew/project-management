const express = require('express');
const router = express.Router();
const {
    registerValidation,
    loginValidation,
} = require('../middlewares/authvalidation.middleware');



const {
    registerUser,
    userLoginController,
    getUserInfo,
    resetPassword
} = require('../controllers/authController');


// router.get('/getInfo', getUserInfo);
router.post('/getInfo', getUserInfo);
router.post('/resetPassword', resetPassword);
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, userLoginController);


module.exports = router;