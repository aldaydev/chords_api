const logger = require('../config/logger.config.js')

const Note = require('../models/note.model.js');
const { LogError } = require('../utils/error.logs.js');

const notesService = {

    getAll: async () => {
        try {
            const notesList = await Note.find();
            return notesList;
        } catch (error) {
            const dbNotesError = new LogError({
                message: 'MongoDB - Error at getting notes',
                error: error
            }).add('dbNotesError');
            throw({resCode: 'internalServerError', logCode: dbNotesError});
        }
    }

}

module.exports = notesService;