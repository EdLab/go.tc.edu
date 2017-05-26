let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let routes = require('./routes');

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

app.enable('trust proxy');

module.exports = app;
