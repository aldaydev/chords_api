const mongoose = require('mongoose');

const chordTypeSchema = new mongoose.Schema({

    //Custom _id
    _id: {type: String, required: true},

    //Name field
    name: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },

    //Intervals array field
    intervals: [{ type: String, required: true }],

    //Description field
    description: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    }
}, 
//Canceling of the automatic generation of "_id" field
{ _id: false }
);

const ChordType = mongoose.model('ChordType', chordTypeSchema, 'chord_types');

module.exports = ChordType;