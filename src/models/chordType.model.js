/**
 * Chord Types model for MongoDB using Mongoose.
 * Defines the schema and virtual references for chord types.
 * 
 * @module models/chordType
 */

const mongoose = require('mongoose');


/**
 * chordSchema - Mongoose schema for chord types.
 * @function chordTypeSchema
 * @param {Object} fields - Options for the schema.
 * @property {String} fields._id - Custom ID for the chord type.
 * @property {Object} fields.name - Name of the chord type in different languages.
 * @property {Array} fields.intervals - Array of intervals for the chord type.
 * @property {Object} fields.description - Description of the chord type in different languages.
 * 
 * @param {Object} options - Options for the schema.
 * @property {boolean} options._id - Cancel automatic generation of "_id" field.
 * 
 * @memberof module:models/chordType
 */
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