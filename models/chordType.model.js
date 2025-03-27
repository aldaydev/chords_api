const mongoose = require('mongoose');

const chordTypeSchema = new mongoose.Schema({

    _id: {type: String, required: true},

    name: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },

    intervals: [{ type: String, required: true }],

    description: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    }
}, { _id: false });

const ChordType = mongoose.model('ChordType', chordTypeSchema, 'chord_types');

module.exports = ChordType;