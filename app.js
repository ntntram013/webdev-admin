require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongodb=require('mongodb');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const storeRouter=require('./routes/store');
require('./dal/book_dal');
var loginRouter = require('./routes/login');


var authMiddleware = require('./middlewares/auth');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('MY SECRET'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/index', authMiddleware.requireAuth, indexRouter);
app.use('/users', authMiddleware.requireAuth, usersRouter);
app.use('/store', authMiddleware.requireAuth, storeRouter);
app.use('/', loginRouter);
app.use('/logout',loginRouter);



console.log(process.env.Uri);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
