/**
 * Not found middleware.
 * It handles 404 errors when the requested resource of the API is not found (not for views)
 * @module notFoundMiddleware
 */

/**
 * "Not Found" middleware function.
 * 
 * This function retrieves a json error response if there is a wrong request to an endpoint at the API.
 * 
 * @function notFoundMiddleware
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @memberof module:notFoundMiddleware
 * 
 * @returns {void} - Returns nothing. It sends a response to the client.
 */
const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: 'Resource not found. Please check the URL.',
        status: 404
    })
}

module.exports = notFoundMiddleware;