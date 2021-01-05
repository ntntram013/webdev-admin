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
// => làm tạm vậy vì đang bị bug handlebars ko get đc req.params, req.query (ko tạo đường link 2 cấp được, vd /forget/:token)
router.get('/5ff2e33aba6a6e1ae4ff4967', adminController.resetPass);
router.post('/5ff2e33aba6a6e1ae4ff4967', adminController.postResetPass);


module.exports = router;