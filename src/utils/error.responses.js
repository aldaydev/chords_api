/**
 * ResError class to create custom error responses.
 * 
 * @module utils/resErrors
 */

class ResError {

    /**
     * Constructor for ResError class.
     * 
     * @constructor
     * @param {Object} properties - Properties for the response error.
     * @property {String} properties.message - Error message.
     * @property {Number} properties.status - HTTP status code (defaults to 500).
     */
    constructor({message, status = '500'}){
        this.message = message;
        this.status = status;
    }

    /**
     * Method to add a ResError instance to resErrors object.
     * 
     * @method
     * @param {String} key - The key to identify the response error.
     * @returns {String} - The key used to identify the response error. We will use it to identify the response error in the error middlewere.
     */
    add (key){
        resErrors[key] = this;
        return key;
    }
}

//logErrors object that contains the 'resCode' of custom and predefined log errors
const resErrors = {

    // ---------- PREDEFINED ERRORS - STATUS 500 ----------

    internalServerError: new ResError({
        message: 'Internal server error. Please try again later.',
        status: 500
    }),

    unexpected: new ResError ({
        message: 'An unexpected server error has occurred. Please try again later.',
        status: 500
    }),

    // ---------- PREDEFINED ERRORS - STATUS 400 ----------

    badRequest: new ResError({
        message: 'Incorrect request. Please check the submitted data.',
        status: 400
    }),

    notFound: new ResError({
        message: 'The resource was not found. Please try again later.',
        status: 400
    })
}

module.exports = {ResError, resErrors};