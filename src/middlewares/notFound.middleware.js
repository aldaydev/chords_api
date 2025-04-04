const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: 'Resource not found. Please check the URL.',
        status: 404
    })
}

module.exports = notFoundMiddleware;