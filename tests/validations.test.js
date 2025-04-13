const {validateQueries, validateChordParam, validateChordTypeParam, calculateValidChords, isValidChordId, isValidNoteId, isValidChordTypeId, isValidLimit, isValidPage, validNotes, validChordTypes} = require('../src/utils/validations.js');

describe('validateQueries', () => {

    it('Should return an array with just one element, which is true for valid queries', () => {

        const validQueries = ['c', 'major', 'all', 1];
        const result = validateQueries(...validQueries);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(true);
    });

    it('Should return an array with two elements, false and an error message, for invalid queries', () => {

        const invalidQueries = [
            ['c#', 'major', 'all', 1], //invalid note
            ['c', 'mayor', 'all', 1], //invalid type
            ['c', 'major', 'abc', 1], //invalid limit
            ['c', 'major', 'all', -1], //invalid page
        ];

        invalidQueries.forEach(invalidQueries => {
            const query = validateQueries(...invalidQueries);
            expect(query).toBeInstanceOf(Array);
            expect(query.length).toBe(2);
            expect(query[0]).toBe(false);
            expect(typeof query[1]).toBe('string');
        });
    });


});

describe('validateChordParam', () => {

    const validChords = calculateValidChords();

    it('Should return an array with just one element, which is true for valid chord Id values', () => {
        validChords.forEach(validChord => {
            const validateItem = validateChordParam(validChord);
            expect(validateItem).toBeInstanceOf(Array);
            expect(validateItem.length).toBe(1);
            expect(validateItem[0]).toBe(true);
        });
    });

    it('Should return an array with two elements, false and an error message, for invalid chord Id values', () => {

        const invalidChordId = ['C#major', 'Do Mayor', 'G#dim', 'A_flat', 'B_sharp', 'F#minor'];

        invalidChordId.forEach(invalidChord => {
            const validation = validateChordTypeParam(invalidChord);
            expect(validation).toBeInstanceOf(Array);
            expect(validation.length).toBe(2);
            expect(validation[0]).toBe(false);
            expect(typeof validation[1]).toBe('string');
        });
    });
});

describe('validateTypeParam', () => {

    it('Should return an array with just one element, which is true for valid type Id values', () => {
        validChordTypes.forEach(chordType => {
            const validateItem = validateChordTypeParam(chordType);
            expect(validateItem).toBeInstanceOf(Array);
            expect(validateItem.length).toBe(1);
            expect(validateItem[0]).toBe(true);
        });
    });

    it('Should return an array with two elements, false and an error message, for invalid type Id values', () => {

        const invalidChordTypeIds = ['disminuido', 'Mayor', 'diminished', 'seventh', 'min', 'maj', 'Menor'];

        invalidChordTypeIds.forEach(chordType => {
            const validation = validateChordTypeParam(chordType);
            expect(validation).toBeInstanceOf(Array);
            expect(validation.length).toBe(2);
            expect(validation[0]).toBe(false);
            expect(typeof validation[1]).toBe('string');
        });
    });
});

describe('isValidPage', () => {

    it('Should return true for valid page values', () => {
        
        const validPageValues = [1, 2, undefined];
        validPageValues.forEach(pageValue => {
            expect(isValidPage(pageValue)).toBe(true);
        });
    });

    it('Should return false for invalid page values', () => {
        const invalidPageValues = [-2, 0, 'abc'];
        invalidPageValues.forEach(pageValue => {
            expect(isValidPage(pageValue)).toBe(false);
        });
    });
});

describe('isValidLimit', () => {

    it('Should return true for valid limit values', () => {
        const validLimits = ['all', 0, 1, 2, undefined];
        validLimits.forEach(limit => {
            expect(isValidLimit(limit)).toBe(true);
        });
    });

    it('Should return false for invalid limit values', () => {
        const invalidLimits = [-2, 'abc'];
        invalidLimits.forEach(limit => {
            expect(isValidLimit(limit)).toBe(false);
        });
    });
});

describe('isValidChordTypeId', () => {

    it('Should return true for valid chord type IDs', () => {

        validChordTypes.forEach(chordTypeId => {
            expect(isValidChordTypeId(chordTypeId)).toBe(true);
        });
    });

    it('Should return false for invalid chord type IDs', () => {

        const invalidChordTypeIds = ['disminuido', 'Mayor', 'diminished', 'seventh', 'min', 'maj', 'Menor'];

        invalidChordTypeIds.forEach(chordTypeId => {
            expect(isValidNoteId(chordTypeId)).toBe(false);
        });
    });
});

describe('isValidNoteId', () => {

    it('Should return true for valid note IDs', () => {

        validNotes.forEach(noteId => {
            expect(isValidNoteId(noteId)).toBe(true);
        });
    });

    it('Should return false for invalid note IDs', () => {

        const invalidNoteIds = ['C#', 'Do', 'G#', 'A_b', 'Fa', 'Gb'];

        invalidNoteIds.forEach(noteId => {
            expect(isValidNoteId(noteId)).toBe(false);
        });
    });
});

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