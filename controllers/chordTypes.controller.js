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
    },

    getById: async (req, res ,next) => {
        try {

            //Getting chord type id from params
            const id = req.params.id;

            //Call for service in database
            const chordTypeById = await chordTypeService.getById(id);

            //Final response
            res.status(200).json(chordTypeById);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordTypesController;