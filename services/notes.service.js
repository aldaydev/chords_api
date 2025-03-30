const Note = require('../models/note.model.js');
const { LogError } = require('../utils/error.logs.js');

const notesService = {

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
                message: {
                    eng: 'Error at getting note list. Please try again later.',
                    spa: 'Error al obtener el listado de notas. Por favor, inténtalo más tarde.'
                },
                status: 500
            }).add('notesResError');

            //Throw an error -> resCode + logCode
            throw({resCode: notesResError, logCode: notesLogError});
        }
    }

}

module.exports = notesService;