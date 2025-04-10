/**
 * Error middleware.
 * It logs the error and sends an appropriate response to the client.
 * @module errorMiddleware
 * @requires module:utils/error.logs
 * @requires module:utils/error.responses
 * @requires module:config/logger
 */

const logger = require("../config/logger.config");
const { LogError, logErrors } = require("../utils/error.logs");
const { resErrors } = require("../utils/error.responses");


/**
 * Error middleware function.
 * 
 * This function handles errors that occur during the request-response cycle. It logs the error and sends an appropriate response to the client.
 * 
 * @function errorMiddleware
 * 
 * @param {Object} err - Error object. It may have a resCode and logCode properties.
 * @param {string} err.resCode - The response code for the error.
 * @param {string} err.logCode - The log code for the error.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @memberof module:errorMiddleware
 * 
 * @returns {void} - Returns nothing. It sends a response to the client.
 */

const errorMiddleware = (err, req, res, next) => {

    //If error involves a log (logCode)
    if(err.logCode){
        //We add the endpoint to the
        logErrors[err.logCode].endpoint = req.originalUrl;

        //Initialize log error
        logger.error(logErrors[err.logCode]);
    }

    let errorResponse;

    //If unexpected error (no resCode)
    if(!resErrors[err.resCode]){
        //Generate an unexpected error response
        errorResponse = resErrors.unexpected;

        //Generate a new custom LogError
        new LogError({
            message: 'Unexpected error',
            endpoint: req.originalUrl,
        }).add('unexpected');

        //Throwing unexpected log error
        logger.error(logErrors.unexpected);

    //If known error
    }else{
        //Set up the res error by resCode
        errorResponse = resErrors[err.resCode]
    }

    //Final error response
    res.status(errorResponse.status).json(errorResponse);

};

module.exports = errorMiddleware;