let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let routes = require('./routes');
let LogsModel = require('../models/logs');

// Create database and listen
LogsModel
  .sync() // { force: false }
  .then(function() {
    Logger.info('Successfully synced logsModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;
