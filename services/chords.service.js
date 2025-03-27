const logger = require('../config/logger.config.js');
const Chord = require('../models/chords.model.js');

const chordService = {

    getAll: async () => {
        try {
            
            return await Chord.find()
                .populate({
                    path: "noteId",
                    select: "-_id"
                })
                .populate({
                    path: "notes", 
                    select: "name -_id"
                });

        } catch (error) {
            logger.error('MongoDB - Error at searching notes');
        }
    }
}

module.exports = chordService;