/**
 * MongoDB connection
 * This module connects to the MongoDB database using Mongoose.
 * @module databases/mongoConnection
 * @requires module:config/mongo
 * @requires module:config/logger
 */

const logger = require('../config/logger.config.js');

const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo.config.js');


/**
 * MongoDB connection function.
 * This function connects to the MongoDB database using Mongoose and logs the connection status. It is called when server starts.
 * @async
 * @function mongoConnection
 * @memberof module:databases/mongoConnection
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects if there is an error.
 */
const mongoConnection = async () => {
    try {
        await mongoose.connect(mongoConfig.uri, mongoConfig.options);
        logger.info('MongoDB - Connected')
    } catch (error) {
        logger.error('MongoDB - Error connecting', error);
    }
}

module.exports = mongoConnection;