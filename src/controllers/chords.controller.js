/**
 * Chords Controller file
 * Contains an object with each controller related to the Chord model
 * @module controllers/chords
 * @requires module:services/chords
 * @requires module:utils/resErrors
 * @requires module:utils/validations
 */

const chordService = require("../services/chords.service.js");
const { ResError } = require("../utils/error.responses.js");
const {validateQueries, validateChordParam} = require("../utils/validations.js");


const chordsController = {

    /**
     * Filters chords based on query parameters.
     * 
     * This function validates query parameters, builds a dynamic filter object for the database query, 
     * handles pagination, and returns the result in a paginated response.
     * 
     * @memberof module:controllers/chords
     * @function
     * @async
     * @param {Object} req - The request object containing query parameters.
     * @param {Object} res - The response object to send the filtered result.
     * @param {Function} next - The next middleware to pass control in case of an error.
     * @returns {void}
     * @throws {Error} Throws an error if invalid query parameters are provided or if there is an issue with the database.
     */
    filter: async (req, res, next) => {
        try {

            //Getting query params from request
            const { note, type, limit, page } = req.query;

            //Query params Validations
            const validate = validateQueries(note, type, limit, page);

            //Throw an error if find any invalid query parameter
            if(!validate[0]){
                //New response Error
                const invalidQueryResError = new ResError({
                    message: validate[1],
                    status: 400
                }).add('invalidQueryResError');
            
                //Throw an error -> only resCode
                throw({resCode: invalidQueryResError});
            };

            //Building the filter dynamically
            const filter = {};
            if (note) filter.noteId = note;
            if (type) filter.typeId = type;

            //If 'limit' doesn´t exist, we set default value (10)
            let limitNum = parseInt(limit) || 10;

            //If 'limit = 0' or 'limit = all', we remove the limit
            if (limit === "0" || limit === "all") {
              limitNum = null; // That means 'nm limit' in mogoose
            }

            //Pagination management
            //If 'page' doesn´t exist, we set default value (1)
            const pageNum = parseInt(page) || 1;
            //If there is 'limit', we calculate skip. If theres no 'limit', skip must be '0'
            const skip = limitNum ? (pageNum - 1) * limitNum : 0;

            //Call for service in database
            const result = await chordService.filter(filter, limitNum, skip, pageNum);

            //Final response
            res.status(200).json(result);
            
        } catch (error) {
            next(error);
        }
    },

    /**
     * Retrieves a chord by its ID.
     * 
     * This function validates the path parameter `id`, and if valid, fetches the chord from the database and returns it as a JSON response.
     * 
     * @memberof module:controllers/chords
     * @function
     * @async
     * @param {Object} req - The request object containing the chord ID as a path parameter.
     * @param {Object} res - The response object to send the chord data.
     * @param {Function} next - The next middleware to pass control in case of an error.
     * @returns {void}
     * @throws {Error} Throws an error if the chord ID is invalid or if there is an issue with the database.
     */
    getById: async (req, res, next) => {
        try {
            
            //Getting chord id from params
            const id = req.params.id;

            //Path param validation
            const validate = validateChordParam(id);

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
            const chordById = await chordService.getById(id);

            //Final response
            res.status(200).json(chordById);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordsController;