const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    //Custom _id
    _id: {type: String, required: true},

    //Name field
    name: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },

    //Note type field
    type: { 
        type: String, 
        enum: ['flat', 'sharp', 'natural'], 
        required: true 
    }
}, 
//Canceling of the automatic generation of "_id" field
{ _id: false }
);

const Note = mongoose.model('Note', noteSchema, 'notes');

module.exports = Note;