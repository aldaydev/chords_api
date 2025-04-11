/**
 * Notes Controller file
 * Contains an object with each controller related to the Note model
 * @module controllers/notes
 * @requires module:services/notes
 */

const notesService = require("../services/notes.service.js");

const notesController = {

    /**
     * Retrieves all notes list throw an object.
     * 
     * This function calls the service to get all notes from the database and sends the result as a response.
     * 
     * @memberof module:controllers/notes
     * @function
     * @async
     * @param {Object} res - The response object to send the result.
     * @param {Function} next - The next middleware to pass control in case of an error.
     * @returns {void}
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    getAll: async (req, res, next) => {
        try {
            //Call to the service to get all notes
            const allNotes = await notesService.getAll();

            //Final response
            res.status(200).json(allNotes);
            
        } catch (error) {
            next(error);
        }
    }

}

module.exports = notesController;