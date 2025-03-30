const ChordType = require('../models/chordType.model.js');

const chordTypeService = {

    getAll: async () => {
        try {
            //Returning all chord types
            return await ChordType.find();
        } catch (error) {

            //New log error
            const chordTypesLogError = new LogError({
                message: 'MongoDB - Error at getting chord types',
                error: error
            }).add('chordTypesLogError');

            //New response Error
            const chordTypesResError = new ResError({
                message: {
                    eng: 'Error at getting chord types list. Please try again later.',
                    spa: 'Error al obtener el listado de tipos de acordes. Por favor, inténtalo más tarde.'
                },
                status: 500
            }).add('chordTypesResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordTypesResError, logCode: chordTypesLogError});
        }
    },

    getById: async (_id) => {
        try {
            
            //Getting chord types by id
            const chordTypeById = await ChordType.find({_id});

            //Returning selected chord type
            return chordTypeById[0];

        } catch (error) {
            //New log error
            const chordTypeByIdLogError = new LogError({
                message: 'MongoDB - Error at getting a chord type by id',
                error: error
            }).add('chordTypeByIdLogError');

            //New response Error
            const chordTypeByIdResError = new ResError({
                message: {
                    eng: 'Error at getting chord type by id. Please try again later.',
                    spa: 'Error al obtener el tipo de acorde por su id. Por favor, inténtalo más tarde.'
                },
                status: 500
            }).add('chordTypeByIdResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordTypeByIdResError, logCode: chordTypeByIdLogError});
        }
    }

}

module.exports = chordTypeService;