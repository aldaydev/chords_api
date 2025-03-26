const logger = require('../config/logger.config.js')

const Note = require('../models/note.model.js');

const notesService = {

    getAll: async () => {
        try {
            const notesList = await Note.find();
            return notesList;
        } catch (error) {
            logger.error('MongoDB - Error at searching notes');
        }
    }

}

module.exports = notesService;