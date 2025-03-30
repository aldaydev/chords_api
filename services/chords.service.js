const Chord = require('../models/chords.model.js');
const { ResError } = require('../utils/error.responses.js');

const chordService = {

    filter: async (filter, limitNum, skip, pageNum) => {
        try {

            //Finding chords that match the filter
            const chords = await Chord.find(filter)
                //Applying 'limit'
                .limit(limitNum)
                //Applying 'skip'
                .skip(skip)
                //Getting 'noteId' referenced data
                .populate({
                    path: "noteId",
                    select: "-_id" //We get everything except id
                })
                //Getting 'notes' referenced data
                .populate({
                    path: "notes", 
                    select: "name -_id" //We get just the name
                })
                //Getting 'typeId' referenced data
                .populate({
                    path: "typeId",
                    select: "-_id" //We get everything except id
                });
            
                //Getting the count of all chords that match the filter
                const chordsCount = await Chord.countDocuments(filter);
                //Calculating total number of pages. If no 'limitNum', is just 1 page
                const totalPages = limitNum ? Math.ceil(chordsCount / limitNum) : 1;

                console.log(chords);

                //Final return to controller
                return {
                    count: chordsCount,
                    currentPage: pageNum,
                    totalPages: totalPages,
                    limit: limitNum,
                    data: chords
                }

        } catch (error) {
            //New log error
            const chordsLogError = new LogError({
                message: 'MongoDB - Error at getting chords',
                error: error
            }).add('chordsLogError');

            //New response Error
            const chordResError = new ResError({
                message: {
                    eng: 'Error at getting chords. Please try again later.',
                    spa: 'Error al obtener el listado de acordes. Por favor, inténtalo más tarde.'
                },
                status: 500
            }).add('chordResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordResError, logCode: chordsLogError});
        }
    }
}

module.exports = chordService;