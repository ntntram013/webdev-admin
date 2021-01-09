var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/',userController.pagination);

router.get('/:id', userController.detail);

router.get('/:id/block', userController.block);
router.get('/:id/unblock', userController.unblock);
router.get('/:id/delete', userController.delete);

module.exports = router;
