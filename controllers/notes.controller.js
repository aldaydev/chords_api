const notesService = require("../services/notes.service.js");

const notesController = {

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