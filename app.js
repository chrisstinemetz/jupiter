require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
  mongoose.set('useCreateIndex', true);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hike = require('./routes/hike');

var app = express();

//use config module to get the privatekey, if no private key set, end the application
if (!process.env.MYPRIVATEKEY) {
  console.error("FATAL ERROR: MYPRIVATEKEY is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://18.223.63.25/nodejsauth", { useNewUrlParser: true,useUnifiedTopology: true  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

// TODO: change to router
app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);

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
app.use('/users', usersRouter);

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
