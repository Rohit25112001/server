require('dotenv').config();
require('./modules/db.module.js');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

const auth = require('./routes/auth.router.js');
const product = require('./routes/product.route.js');
const verifyToken = require('./routes/verifyToken.route.js');
const accessTokenRenew = require('./routes/access.route.js');
const ipcheck = require('./routes/ipcheck.route.js');
const test = require('./routes/test.route.js');
//admin
const admin = require('./routes/admin-auth.route.js');
const verifyAdmin = require('./routes/verify-admin.routes.js')
const admin_access_token = require('./routes/admin-at-gen.route.js');

//middleware
const session = require('./middleware/session.middleware.js')
const checkIp = require('./middleware/checkip.middleware.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsConfig = {
  origin: 'https://rentmojo-eight.vercel.app',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))

// app.options('*', cors());
app.use('/test', test);
app.use('/auth', auth);
// app.use('/admin', admin);
app.use('/product', product);

//user
app.use('/verify-token', session, verifyToken);
app.use('/access-token',session, accessTokenRenew);

//admin
app.use('/ipcheck',ipcheck);
app.use('/admin',admin);
app.use('/admin-verify',verifyAdmin);
app.use('/accessTokenAdmin',admin_access_token);


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
