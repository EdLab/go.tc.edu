const express = require('express');
const app = express();
const packageConfig = require('../package.json');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.notFound = (message = 'Not Found') => {
    let err = new Error(message);
    err.status = 404;
    if (process.env.NODE_ENV === 'production') {
      res.status(404).send(message);
    } else {
      next(err);
    }
  };
  res.internalError = (message = 'Something went wrong!') => {
    let err = new Error(message);
    err.status = 500;
    if (process.env.NODE_ENV === 'production') {
      res.status(500).send(message);
    } else {
      next(err);
    }
  };
  next();
});

app.get('/version', (req, res)=>{
  res.json({version: packageConfig.version});
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  res.send('I\'m sorry to let you down, but there\'s nothing I can give you');
});
app.enable('trust proxy');

module.exports = app;
