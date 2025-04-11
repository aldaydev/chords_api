/**
 * Chords model for MongoDB using Mongoose.
 * Defines the schema and virtual references for chords.
 * 
 * @module models/chord
 */


const mongoose = require('mongoose');

/**
 * chordSchema - Mongoose schema for chords.
 * @function chordSchema
 * @param {Object} fields - Options for the schema.
 * @property {String} fields._id - Custom ID for the chord.
 * @property {String} fields.noteId - Reference to the Note schema.
 * @property {String} fields.typeId - Reference to the ChordType schema.
 * @property {Array<Object>} fields.notes - Array of references to the Note schema.
 * @property {Object} fields.name - Name of the chord in different languages.
 * @property {Object} fields.images - Links to images of the chord.
 * 
 * @param {Object} options - Options for the schema.
 * @property {boolean} options._id - Cancel automatic generation of "_id" field.
 * @property {Object} options.toJSON - Options for JSON output.
 * 
 * @memberof module:models/chord
 */

const chordSchema = new mongoose.Schema({
    //Custom _id
    _id: { type: String, required: true },
    //Reference to _id field of Note Schema
    noteId: { type: String, ref: 'Note', required: true },
    //Reference to _id field of ChordType Schema
    typeId: { type: String, ref: 'ChordType', required: true },
    //Included notes (reference to _id field of Note Schema)
    notes: [{ type: String, ref: 'Note', required: true }],
    //Name field
    name: {
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },
    //Images links
    images: {
        //Foreseeing multiple images in the future
        pos1: { type: String }
    }
}, {
    //Canceling of the automatic generation of "_id" field
    _id: false ,
    //Modifing the json response of the model
    toJSON: {
        //Enables a virtual json output
        virtuals: true,
        //Changes we want in the virtualization
        transform: (doc, ret) => {
            //Renaming 'noteId' to 'note' for greater user clarity
            ret.note = ret.noteId;
            //Renaming 'typeId' to 'type' for greater user clarity
            ret.type = ret.typeId;
            //Deleting old original fields 'noteId', 'typeId' and 'id'
            delete ret.typeId;
            delete ret.noteId;
            delete ret.id;
        }
    }
});

/**
 * Virtual reference of 'noteId'
 * 
 * @function setupNoteVirtual
 * @param {string} note - Name of the field to be referenced.
 * @param {object} options - Options fot the virtual reference.
 * @param {string} options.ref - Name of the referenced model.
 * @param {string} options.localField - Field in the current schema that includes the reference.
 * @param {string} options.foreignField - Field of the referenced model that matches.
 * @param {boolean} options.justOne - Indicates if only one field is referenced.
 * 
 * @memberof module:models/chord
 */
chordSchema.virtual('note', {
    ref: 'Note', //Referenced model
    localField: 'noteId', //Filed in current schema that includes the reference
    foreignField: '_id', //Field of the referenced model that matches
    justOne: true //Only one field to reference
});

/**
 * Virtual reference of 'noteId'
 * 
 * @function setupTypeVirtual
 * @param {string} note - Name of the field to be referenced.
 * @param {object} options - Options fot the virtual reference.
 * @param {string} options.ref - Name of the referenced model.
 * @param {string} options.localField - Field in the current schema that includes the reference.
 * @param {string} options.foreignField - Field of the referenced model that matches.
 * @param {boolean} options.justOne - Indicates if only one field is referenced.
 * 
 * @memberof module:models/chord
 */
chordSchema.virtual('type', {
    ref: 'ChordType', //Referenced model
    localField: 'typeId', //Filed in current schema that includes the reference
    foreignField: '_id',  //Field of the referenced model that matches
    justOne: true  //Only one field to reference
});

const Chord = mongoose.model('Chord', chordSchema, 'chords');

module.exports = Chord;