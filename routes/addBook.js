var express = require('express');
var router = express.Router();

const bookController=require('../controllers/BookController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('add_book',{title:'Test'});
});


module.exports = router;
