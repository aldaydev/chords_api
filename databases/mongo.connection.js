const logger = require('../config/logger.config.js');

const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo.config.js');

const mongoConnection = async () => {
    try {
        await mongoose.connect(mongoConfig.uri, mongoConfig.options);
        logger.info('MongoDB - Connected')
    } catch (error) {
        logger.error('MongoDB - Error connecting', error);
    }
}

module.exports = mongoConnection;