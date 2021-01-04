var express = require('express');
var router = express.Router();

const passport = require('../passport');
const adminController = require('../controllers/adminController');


router.get('/', adminController.login);
router.post('/', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', adminController.logout);

router.get('/forget', adminController.forgetPass);
//router.get('/forget/:token', adminController.resetPass);
//router.post('/forget/:token', adminController.postResetPass);


module.exports = router;