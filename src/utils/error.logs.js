/**
 * LogError class to create custom error logs.
 * 
 * @module utils/logErrors
 */

class LogError {

    /**
     * Constructor for LogError class.
     * 
     * @constructor
     * @param {Object} properties - Properties for the log error.
     * @property {Date} properties.timestamp - Timestamp of the error (generated automatically).
     * @property {String} properties.message - Error message.
     * @property {String} properties.error - Error details (optional).
     * @property {Number} properties.status - HTTP status code (defaults to 500).
     * @property {String} endpoint - Endpoint where the error occurred (optional, It will be taken from request in the error middlewere).
     */
    constructor({ message, error, status, endpoint }) {

        this.timestamp = new Date().toISOString();
        this.message = message;
        this.error = error || null;
        this.status = status || 500;

        //Taken from request
        this.endpoint = null;
    }

    /**
     * Method to add a LogError instance to logErrors object.
     * 
     * @method
     * @param {String} key - The key to identify the log error.
     * @returns {String} - The key used to identify the log error. We will use it to identify the log error in the error middlewere.
     */
    add (key){
        logErrors[key] = this;
        return key;
    }
};

//logErrors object that contains the 'logCode' of custom log errors
const logErrors = {};

module.exports = {LogError, logErrors};