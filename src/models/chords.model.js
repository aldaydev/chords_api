const mongoose = require('mongoose');

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

//Virtual reference of 'noteId'
chordSchema.virtual('note', {
    ref: 'Note', //Referenced model
    localField: 'noteId', //Filed in current schema that includes the reference
    foreignField: '_id', //Field of the referenced model that matches
    justOne: true //Only one field to reference
});

//Virtual reference of 'typeId'
chordSchema.virtual('type', {
    ref: 'ChordType', //Referenced model
    localField: 'typeId', //Filed in current schema that includes the reference
    foreignField: '_id',  //Field of the referenced model that matches
    justOne: true  //Only one field to reference
});

const Chord = mongoose.model('Chord', chordSchema, 'chords');

module.exports = Chord;