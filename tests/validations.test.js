const {validateQueries, validateChordParam, validateChordTypeParam, calculateValidChords, isValidChordId, isValidNoteId, isValidChordTypeId, isValidLimit, isValidPage} = require('../src/utils/validations.js');

describe('isValidChordId', () => {
    it('Should return true for valid chord IDs', () => {
        const validChordIds = calculateValidChords();

        validChordIds.forEach(chordId => {
            expect(isValidChordId(chordId)).toBe(true);
        });
    });

    it('Should return false for invalid chord IDs', () => {
        const invalidChordId = ['C#major', 'Do Mayor', 'G#dim', 'A_flat', 'B_sharp', 'F#minor'];

        invalidChordId.forEach(chordId => {
            expect(isValidChordId(chordId)).toBe(false);
        });
    });

    
});

describe('calculateValidChords', () => {
    it('Should return an array of valid chords with the correct length (68 elements)', () => {
        const validChords = calculateValidChords();
        expect(Array.isArray(validChords)).toBe(true);
        expect(validChords.length).toBe(68);
    });

    it('should contain elements with the correct format (examples: "c_major", "a_sharp_minor", "e_flat_7" or "f_dim") ', () => {
        const validChords = calculateValidChords();
        const regex = /^[a-g](_sharp|_flat)?_(major|minor|7|dim)$/;

        validChords.forEach(chord => {
            expect(chord).toMatch(regex);
        })
    });
});