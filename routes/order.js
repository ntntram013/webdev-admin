var express = require('express');
var router = express.Router();

let orderController=require('../controllers/orderController')

router.get('/',orderController.RenderOrderList);
router.post('/changestatus',orderController.ChangeStatus);

router.get('/:_id',orderController.RenderDetail);

module.exports = router;
