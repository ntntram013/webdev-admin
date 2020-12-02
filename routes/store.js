var express = require('express');
var router = express.Router();
const bookController=require('../controllers/BookController')

/* GET users listing. */
router.get('/', bookController.index);
router.get('/addBook',bookController.add);

router.post('/addBook',bookController.postAdd);





router.get('/modify/:id',bookController.detail);

module.exports = router;
