const chordsController = require('../controllers/chords.controller.js');
const chordTypesController = require('../controllers/chordTypes.controller.js');
const notesController = require('../controllers/notes.controller.js');

const router = require('express').Router();

//---------- NOTES ROUTES ----------//

router.get('/notes', notesController.getAll);

//---------- CHORD TYPES ROUTES ----------//

router.get('/chord-types', chordTypesController.getAll);

//---------- CHORDS ROUTES ----------//

router.get('/chords', chordsController.filter);



module.exports = router;