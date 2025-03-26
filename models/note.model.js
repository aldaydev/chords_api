const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    noteId: {
        type: String,
        required: true
    },

    name: { 
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },

    type: { 
        type: String, 
        enum: ['flat', 'sharp', 'natural'], 
        required: true 
    }
})

const Note = mongoose.model('Note', noteSchema, 'notes');

module.exports = Note;