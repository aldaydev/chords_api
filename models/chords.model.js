const mongoose = require('mongoose');

const chordSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    noteId: { type: String, ref: 'Note', required: true },
    typeId: { type: String, ref: 'ChordType', required: true },
    notes: [{ type: String, ref: 'Note', required: true }],
    name: {
        eng: { type: String, required: true },
        spa: { type: String, required: true }
    },
    images: {
        pos1: { type: String }
    }
}, {
    _id: false ,
    toJSON: {
        virtuals: true, // Necesario para que los virtuales se incluyan en la salida JSON
        transform: (doc, ret) => {
            // Renombramos `noteId` a `note` para que tenga más sentido para el usuario final
            ret.note = ret.noteId;
            ret.type = ret.typeId;
            delete ret.typeId;
            delete ret.noteId;  // Eliminamos el campo original de `noteId`
        }
    }
});

// Este método virtual será útil para "mapear" el `noteId` a `note`
chordSchema.virtual('note', {
    ref: 'Note',
    localField: 'noteId',
    foreignField: '_id',
    justOne: true
});

chordSchema.virtual('type', {
    ref: 'ChordType',  // Modelo al que quieres hacer referencia
    localField: 'typeId',  // El campo en tu esquema que tiene la referencia
    foreignField: '_id',  // El campo en el modelo de referencia que coincide con localField
    justOne: true  // Si es un solo objeto relacionado (si fuera un array de objetos, pondrías false)
});

const Chord = mongoose.model('Chord', chordSchema, 'chords');

module.exports = Chord;