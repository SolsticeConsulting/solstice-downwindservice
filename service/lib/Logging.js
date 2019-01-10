/**
 * Logging
 *
 * Created by jcooley on 4/26/18.
 */

const winston = require('winston');

const transports = {
    console: new winston.transports.Console({
        colorize: true,
        level: 'verbose'
    })
};

const logger = winston.createLogger({
    transports: [
        transports.console
    ]
});

module.exports = logger;
