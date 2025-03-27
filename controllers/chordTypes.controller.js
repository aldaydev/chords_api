const logger = require("../config/logger.config.js");
const chordTypeService = require("../services/chordTypes.service.js");


const chordTypesController = {

    getAll: async (req, res, next) => {
        try {
            const allChordTypes = await chordTypeService.getAll();
            res.send(allChordTypes);
        } catch (error) {
            res.status(500).json({message: 'Error: ', error: error});
            logger.error('Error al finding note list', error);
        }
    }

}

module.exports = chordTypesController;