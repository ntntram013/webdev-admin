var express = require('express');
var router = express.Router();

const catalogController = require('../controllers/catalogController');

router.get('/',catalogController.pagination);
router.get('/:_id/modify',catalogController.changeName);
router.post('/:_id/modify',catalogController.postChangeName);
router.get('/add',catalogController.RenderAdd);
router.post('/add',catalogController.postAdd);

//router.get('/:id/delete', userController.delete);

module.exports = router;
