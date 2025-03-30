const logger = require("../config/logger.config.js");
const chordTypeService = require("../services/chordTypes.service.js");


const chordTypesController = {

    getAll: async (req, res, next) => {
        try {
            //Call to the service to get all chord types
            const allChordTypes = await chordTypeService.getAll();

            //Final response
            res.send(allChordTypes);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordTypesController;