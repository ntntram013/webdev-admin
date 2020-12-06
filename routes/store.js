var express = require('express');
var router = express.Router();
const bookController=require('../controllers/BookController')

/* GET users listing. */

router.get('/', bookController.index);
router.get('/addBook',bookController.add);
router.get('/',bookController.pagination);


router.get('/addBook', bookController.add);


router.post('/addBook', bookController.postAdd);


router.get('/:id',bookController.detail);


router.get('/:id/modify',bookController.modify);
router.post('/:id/modify',bookController.postModify);

router.get('/:id/delete',bookController.delete);

module.exports = router;
