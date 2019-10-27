const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

// Set up the express app
const app = express();
const passport = require('passport');
const router = require('./routes');

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.trace(err);

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;