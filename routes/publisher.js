var express = require('express');
var router = express.Router();

const publisherController = require('../controllers/publisherController');

router.get('/',publisherController.pagination);
router.get('/:_id/modify',publisherController.changeName);
router.post('/:_id/modify',publisherController.postChangeName);

router.get('/add',publisherController.RenderAdd);
router.post('/add',publisherController.postAdd);


module.exports = router;
