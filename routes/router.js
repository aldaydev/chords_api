const chordsController = require('../controllers/chords.controller.js');
const chordTypesController = require('../controllers/chordTypes.controller.js');
const notesController = require('../controllers/notes.controller.js');

const router = require('express').Router();

//---------- NOTES ROUTES ----------//

router.get('/notes', notesController.getAll);

//---------- CHORD TYPES ROUTES ----------//

router.get('/chord-types', chordTypesController.getAll);

router.get('/chord-types/:id', chordTypesController.getById);

//---------- CHORDS ROUTES ----------//

router.get('/chords', chordsController.filter);

router.get('/chords/:id', chordsController.getById);



module.exports = router;