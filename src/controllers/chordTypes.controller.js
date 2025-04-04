const chordTypeService = require("../services/chordTypes.service.js");
const { ResError } = require("../utils/error.responses.js");
const { validateChordTypeParam } = require("../utils/validations.js");


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

            //Path param validation
            const validate = validateChordTypeParam(id);

            //Throw an error if find an invalid path parameter
            if(!validate[0]){
                //New response Error
                const invalidParamResError = new ResError({
                    message: validate[1],
                    status: 400
                }).add('invalidParamResError');
            
                //Throw an error -> only resCode
                throw({resCode: invalidParamResError});
            }

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