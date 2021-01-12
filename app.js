// set up ======================================================================
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongodb = require('mongodb');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const session = require('express-session');
console.log(require('dotenv').config());
const exphbs = require('express-handlebars');
const flash = require('connect-flash');










const passport = require('./passport');
const authenthicateMid = require('./middlewares/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storeRouter = require('./routes/store');
const loginRouter = require('./routes/login');
const profileRouter=require('./routes/profile');
const defaultRouter=require('./routes/defaultRoute');
const orderRouter=require('./routes/order');
const catalogRouter=require('./routes/catalog');

const app = express();

// configuration ===============================================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    helpers:
        {
            Compare:function(v1,operator,v2,options) {

                v1 = parseInt(v1);
                v2 = parseInt(v2);

                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case '!==':
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            }
        }
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
// body parser
app.use(express.urlencoded({extended: false}));
// cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
// Express session
app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());
// flash messages stored in session
app.use(flash());
// global variables (for views layout)
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.err = req.flash('err');
    next();
});
// authentication middlewares
app.use(authenthicateMid.requireAuth);

// routes ======================================================================
app.use('/', defaultRouter);
app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/store', storeRouter);
app.use('/profile', profileRouter);
app.use('/order', orderRouter);
app.use('/catalog',catalogRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});









module.exports = app;
