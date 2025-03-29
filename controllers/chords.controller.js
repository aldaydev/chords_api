const logger = require("../config/logger.config.js");
const chordService = require("../services/chords.service.js");


const chordsController = {

    getAll: async (req, res, next) => {
        try {
            const allChords = await chordService.getAll();
            console.log(allChords);
            res.json(allChords);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordsController;