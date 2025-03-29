const ChordType = require('../models/chordType.model.js');

const chordTypeService = {

    getAll: async () => {
        try {
            return await ChordType.find();
        } catch (error) {
            const dbChordTypesError = new LogError({
                message: 'MongoDB - Error at getting chord types',
                error: error
            }).add('dbChordTypesError');
            throw({resCode: 'internalServerError', logCode: dbChordTypesError});
        }
    }

}

module.exports = chordTypeService;