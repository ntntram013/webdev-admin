var express = require('express');
var router = express.Router();

let adminController=require('../controllers/adminController')

router.get('/',adminController.RenderProfile);
router.get('/modify',adminController.RenderModify);
router.post('/modify',adminController.postModify);

router.post('/changepassword',adminController.postChangePassword);
router.get('/changepassword',adminController.RenderChangePassword);
module.exports = router;
