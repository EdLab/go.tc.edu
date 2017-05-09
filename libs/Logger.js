var winston = require('winston');
const moment = require('moment');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
        	timestamp: () => {
        	return moment().format('YYYY-MM-DD h:mm:ss Z')
      		},
            level: 'info',
            filename: './logs/logs.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            timestamp: () => {
        	return moment().format('YYYY-MM-DD h:mm:ss Z')
      		},
            level: 'debug',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};