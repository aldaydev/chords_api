const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: 'Resource not found',
        status: 404
    })
}

module.exports = notFoundMiddleware;