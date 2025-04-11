const {validateQueries, validateChordParam, validateChordTypeParam, calculateValidChords, isValidChordId, isValidNoteId, isValidChordTypeId, isValidLimit, isValidPage} = require('../src/utils/validations.js');

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