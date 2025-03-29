const logger = require("../config/logger.config.js");
const chordTypeService = require("../services/chordTypes.service.js");


const chordTypesController = {

    getAll: async (req, res, next) => {
        try {
            const allChordTypes = await chordTypeService.getAll();
            res.send(allChordTypes);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordTypesController;