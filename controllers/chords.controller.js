const logger = require("../config/logger.config.js");
const chordService = require("../services/chords.service.js");


const chordsController = {

    filter: async (req, res, next) => {
        try {

            //Getting query params from request
            const { note, type, limit, page } = req.query;

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
    }

}

module.exports = chordsController;