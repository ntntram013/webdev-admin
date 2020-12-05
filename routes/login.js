var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/', loginController.login);

router.post('/', loginController.postLogin);

router.get('/logout', loginController.logout);


module.exports = router;