const notesService = require("../services/notes.service.js");

const notesController = {

    getAll: async (req, res, next) => {
        try {
            const allNotes = await notesService.getAll();
            res.status(200).json(allNotes);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = notesController;