var express = require('express');
var router = express.Router();

const passport = require('../passport');
const adminController = require('../controllers/adminController');
const adminService=require('../models/adminService');

router.get('/',adminController.login);
router.post('/', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}));



router.get('/forget', adminController.forgetPass);
router.get('/forget/:token', adminController.resetPass);
router.post('/forget/:token', adminController.postResetPass);


module.exports = router;