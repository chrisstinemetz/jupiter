require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
  mongoose.set('useCreateIndex', true);
const usersRoute = require("./routes/users");


var indexRouter = require('./routes/index');

const port = process.env.PORT
require('./db/dbConfig')
var hike = require('./routes/hike');

var app = express();

app.use(express.json())

//use config module to get the privatekey, if no private key set, end the application
if (!process.env.JWT_KEY) {
  console.error("FATAL ERROR: JWT_KEY is not defined.");
  process.exit(1);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/', indexRouter);
app.use('/v1', usersRoute);

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
