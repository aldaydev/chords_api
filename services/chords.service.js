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
                message: 'Error at getting chords. Please try again later.',
                status: 500
            }).add('chordResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordResError, logCode: chordsLogError});
        }
    },

    getById: async (_id) => {
        try {
            
            //Getting chord by id
            const chordById = await Chord.find({_id})
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
            
                //Returning selected element
                return chordById[0];

        } catch (error) {
            //New log error
            const chordByIdLogError = new LogError({
                message: 'MongoDB - Error at getting a chord by id',
                error: error
            }).add('chordByIdLogError');

            //New response Error
            const chordByIdResError = new ResError({
                message: 'Error at getting chord by id. Please try again later.',
                status: 500
            }).add('chordByIdResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordByIdResError, logCode: chordByIdLogError});
        }
    }
}

module.exports = chordService;