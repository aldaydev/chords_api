const logger = require("../config/logger.config.js");
const chordService = require("../services/chords.service.js");


const chordsController = {

    filter: async (req, res, next) => {
        try {

            const { note, chordtype, limit, page } = req.query;

            // Construimos el filtro dinámicamente
            const filter = {};
            if (note) filter.note = note;
            if (chordtype) filter.chordtype = chordtype;

            // Si el usuario no envía `limit`, usamos el valor por defecto (10)
            let limitNum = parseInt(limit) || 10;

            // Si el usuario envía `limit=0` o `limit=all`, quitamos el límite
            if (limit === "0" || limit === "all") {
              limitNum = null; // Esto significa "sin límite" en Mongoose
            }

            // Manejo de paginación
            const pageNum = parseInt(page) || 1;
            const skip = limitNum ? (pageNum - 1) * limitNum : 0; // Si no hay límite, skip debe ser 0

            const result = await chordService.filter(filter, limitNum, skip, pageNum);

            res.status(200).json(result);
            
        } catch (error) {
            next(error);
        }
    }

}

module.exports = chordsController;