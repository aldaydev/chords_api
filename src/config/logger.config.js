/**
 * Logger configuration module for the API.
 * Uses Winston to log messages to both console and file.
 * @module config/logger
 */

const winston = require('winston');

/**
 * Logger configured with two transports:
 * - Console: 'http' level, simple format.
 * - File: 'error' level, JSON format with timestamp.
 *
 * @constant
 * @type {winston.Logger}
 * @param {Object} options - Options for the logger.
 * @param {string} options.level - The minimum log level.
 * @param {Array} options.transports - The transports for the logger.
 * @memberof module:config/logger
 */

//Set up logger: levels, transports, formats
const logger = winston.createLogger({
    // Can be: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
    level: 'http', 
    //Transports = destinations / Can be: console, file...
    transports: [
        // Show logs in console
        new winston.transports.Console({
            format: winston.format.simple()
        }), 
        //Save logs in a file
        new winston.transports.File({
            filename: 'src/logs/chords_api.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json()
            )
        })
    ]
});

module.exports = logger;