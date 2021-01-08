var express = require('express');
var router = express.Router();

const adminController=require('../controllers/adminController');

router.post('/logout',adminController.logout);

module.exports = router;
