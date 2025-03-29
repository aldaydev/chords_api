const logger = require("../config/logger.config");
const { LogError, logErrors } = require("../utils/error.logs");
const { resErrors } = require("../utils/error.responses");



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