const logger = require('../config/logger.config.js');
const ChordType = require('../models/chordType.model.js');

const chordTypeService = {

    getAll: async () => {
        try {
            return await ChordType.find();
        } catch (error) {
            logger.error('MongoDB - Error at searching notes');
        }
    }

}

module.exports = chordTypeService;