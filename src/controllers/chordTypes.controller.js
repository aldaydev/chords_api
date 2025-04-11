/**
 * Chord Types Controller file
 * Contains an object with each controller related to the ChordType model
 * @module controllers/chordTypes
 * @requires module:services/chordTypes
 * @requires module:utils/resErrors
 * @requires module:utils/validations
 */

const chordTypeService = require("../services/chordTypes.service.js");
const { ResError } = require("../utils/error.responses.js");
const { validateChordTypeParam } = require("../utils/validations.js");


const chordTypesController = {


    /**
     * Retrieves all chord types list throw an object.
     * 
     * This function calls the service to get all chord types from the database and sends the result as a response.
     * 
     * @memberof module:controllers/chordTypes
     * @function
     * @async
     * @param {Object} res - The response object to send the result.
     * @param {Function} next - The next middleware to pass control in case of an error.
     * @returns {void}
     * @throws {Error} Throws an error if there is an issue with the database.
     */
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

    /**
     * Retrieves a chord types object.
     * 
     * This function calls the service to get all chord types from the database and sends the result as a response.
     * 
     * @memberof module:controllers/chordTypes
     * @function
     * @async
     * @param {Object} req - The request object containing the chord type ID in the URL parameters.
     * @param {Object} res - The response object to send the result.
     * @param {Function} next - The next middleware to pass control in case of an error.
     * @returns {void}
     * @throws {Error} Throws an error if there is an issue with the database.
     */
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