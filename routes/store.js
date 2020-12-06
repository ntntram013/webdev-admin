var express = require('express');
var router = express.Router();
const bookController=require('../controllers/BookController')

/* GET users listing. */

//router.get('/', bookController.index);
router.get('/addBook',bookController.add);
router.get('/',bookController.pagination);
router.post('/',bookController.pagination);

router.get('/addBook', bookController.add);

router.post('/addBook',bookController.add);
router.post('/addBook/addToDb', bookController.postAdd);


router.post('/:id',bookController.detail);


router.post('/:id/modify',bookController.modify);
router.post('/:id/modify/updateToDb',bookController.postModify);

router.get('/:id/delete',bookController.delete);

module.exports = router;
