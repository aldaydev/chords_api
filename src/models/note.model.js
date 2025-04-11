/**
 * Note model for MongoDB using Mongoose.
 * Defines the schema and virtual references for notes.
 * 
 * @module models/note
 */

const mongoose = require('mongoose');


/**
 * chordSchema - Mongoose schema for notes.
 * @function noteSchema
 * @param {Object} fields - Options for the schema.
 * @property {String} fields._id - Custom ID for the note.
 * @property {Object} fields.name - Name of the note in different languages.
 * @property {String} fields.type - Type of the note.
 * 
 * @param {Object} options - Options for the schema.
 * @property {boolean} options._id - Cancel automatic generation of "_id" field.
 * 
 * @memberof module:models/note
 */
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