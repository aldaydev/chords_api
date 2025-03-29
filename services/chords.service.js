const Chord = require('../models/chords.model.js');

const chordService = {

    filter: async (filter, limitNum, skip, pageNum) => {
        try {

            const chords = await Chord.find(filter)
                .limit(limitNum)
                .skip(skip)
                .populate({
                    path: "noteId",
                    select: "-_id"
                })
                .populate({
                    path: "notes", 
                    select: "name -_id"
                })
                .populate({
                    path: "typeId",
                    select: "-_id"
                });
            
                const chordsCount = await Chord.countDocuments(filter);
                // Si no hay `limit`, el total de páginas es 1 (todo en una sola respuesta)
                const totalPages = limitNum ? Math.ceil(chordsCount / limitNum) : 1;

                console.log('llega hasta aquí');

                return {
                    count: chordsCount,
                    currentPage: pageNum,
                    totalPages: totalPages,
                    limit: limitNum,
                    data: chords
                }

        } catch (error) {
            const dbChordsError = new LogError({
                message: 'MongoDB - Error at getting chords',
                error: error
            }).add('dbChordsError');
            throw({resCode: 'internalServerError', logCode: dbChordsError});
        }
    }
}

module.exports = chordService;