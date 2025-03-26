const logger = require('../config/logger.config.js');
const notesService = require('../services/notes.service.js');

const router = require('express').Router();

router.get('/notes', async (req, res) => {

    try {
        const allNotes = await notesService.getAll();
        const object = allNotes;
        console.log(object);
        res.send(allNotes);
    } catch (error) {
        res.status(500).json({message: 'Error: ', error: error});
        logger.error('Error al finding note list', error);
    }
})

module.exports = router;