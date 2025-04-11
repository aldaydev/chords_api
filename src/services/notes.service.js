/**
 * Notes service using MongoDB.
 * Performs operations related to the "Note" Model in MongoDB (Mongooge)
 * 
 * @module services/notes
 * 
 * @requires models/note
 * @requires utils/resErrors
 * @requires utils/logErrors
 */

const Note = require('../models/note.model.js');
const { LogError } = require('../utils/error.logs.js');
const { ResError } = require('../utils/error.responses.js');

const notesService = {

    /**
     * Uses mongoose to get all notes from MongoDB.
     * 
     * @memberof module:services/notes
     * @function
     * @async
     * @returns {Object} - An object containing all notes data.
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    getAll: async () => {
        try {
            //Returning all chord types
            return await Note.find();
        } catch (error) {
            //New log error
            const notesLogError = new LogError({
                message: 'MongoDB - Error at getting notes',
                error: error
            }).add('notesLogError');

            //New response Error
            const notesResError = new ResError({
                message: 'Error at getting note list. Please try again later.',
                status: 500
            }).add('notesResError');

            //Throw an error -> resCode + logCode
            throw({resCode: notesResError, logCode: notesLogError});
        }
    }

}

module.exports = notesService;