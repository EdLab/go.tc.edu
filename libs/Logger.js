var winston = require('winston');
const moment = require('moment');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: () => {
        return moment().format('YYYY-MM-DD h:mm:ss Z');
      },
      level: 'info',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
