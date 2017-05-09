#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('../routes/routes-redirect');
var debug = require('debug')('express-sequelize-mysql');
var http = require('http')
var logsModel = require('../models/logs');
var logger = require('../libs/Logger')
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
 * Create HTTP server.
 */

var server = http.createServer(app)


// Listen on provided port, on all network interfaces.
server.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});
server.on('error', onError);
server.on('listening', onListening);
// });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// Create database and listen
logsModel
  .sync() // { force: false }
  .then(function() {
    logger.info('Successfully synced logsModel')  
  }).catch(function(err)
  {
    // handle error
    logger.error('Error while listening to database', err);
  }
  );