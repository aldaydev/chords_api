/**
 * Validation function for the Chords API.
 * 
 * @module utils/validations
 */

//Array of valid note Ids
const validNotes = ['a_flat', 'a', 'a_sharp', 'b_flat', 'b', 'c', 'c_sharp', 'd_flat', 'd', 'd_sharp', 'e_flat', 'e', 'f', 'f_sharp', 'g_flat', 'g', 'g_sharp'];

//Array of valid chord type Ids
const validChordTypes = ['major', 'minor', 'dim', '7'];


/**
 * Function to calculate valid chord Ids
 * 
 * It combines all valid notes with all valid chord types to create a list of valid chord Ids.
 * 
 * @memberof module:utils/validations
 * @function
 * @returns {Array} - An array of valid chord Ids.
 */
const calculateValidChords = () => {

    let allValidChords = [];

    for(let i = 0; i < validNotes.length; i++){
        for(let j = 0; j < validChordTypes.length; j++){
            allValidChords.push(validNotes[i] + '_' + validChordTypes[j]);
        }
    }

    return allValidChords;
}

//Array of valid chord Ids (calling to the function)
const validChords = calculateValidChords();

//---------- VALIDATE SINGLE VALUES ----------//

/**
 * Validate chord id
 * 
 * This function checks if the provided chordId is valid by comparing it against a list of valid chords.
 * 
 * @memberof module:utils/validations
 * @function
 * @param {String} chordId - The chord Id to validate.
 * @returns {Boolean} - Returns true if the chordId is valid, false if not.
 */
const isValidChordId = (chordId) => {
    if(!chordId || !validChords.includes(chordId)){
        return false;
    }else{
        return true;
    }
}

/**
 * Validate note id
 * 
 * This function checks if the provided noteId is valid by comparing it against a list of valid notes.
 * 
 * @memberof module:utils/validations
 * @function
 * @param {String} noteId - The note Id to validate.
 * @returns {Boolean} - Returns true if the noteId is valid, false if not.
 */
const isValidNoteId = (noteId) => {
    if(noteId && !validNotes.includes(noteId)){
        return false;
    }else{
        return true;
    }
}

/**
 * Validate chord type id
 * 
 * This function checks if the provided typeId is valid by comparing it against a list of valid chords types.
 * 
 * @memberof module:utils/validations
 * @function
 * @param {String} typeId - The chord type Id to validate.
 * @returns {Boolean} - Returns true if the typeId is valid, false if not.
 */
const isValidChordTypeId = (typeId) => {
    if(typeId && !validChordTypes.includes(typeId)){
        return false;
    }else{
        return true;
    }
}

/**
 * Validate limit (number or strnig 'all')
 * 
 * This function checks if the provided 'limit' is a number, 0 or 'all'.
 * 
 * @memberof module:utils/validations
 * @function
 * @param {String|Number} limit - The limit parameter to validate.
 * @returns {Boolean} - Returns true if the limit is valid, false if not.
 */
const isValidLimit = (limit) => {
    if (limit !== undefined && limit !== 'all' && (!/^\d+$/.test(limit) || parseInt(limit) < 0)) {
        return false;
    }else{
        return true;
    }
}

/**
 * Validate page (number)
 * 
 * This function checks if the provided 'page' is a correct number.
 * 
 * @memberof module:utils/validations
 * @function
 * @param {Number} page - The "page" parameter to validate.
 * @returns {Boolean} - Returns true if the page is valid, false if not.
 */
const isValidPage = (page) => {
    if (page !== undefined && (!/^\d+$/.test(page) || parseInt(page) <= 0)) {
        return false;
    }else{
        return true;
    }
}

//---------- VALIDATION FUNCTIONS ----------//

/**
 * Validates all query parameters
 * @param {String} note - The note query parameter to validate.
 * @param {String} type - The type query parameter to validate.
 * @param {String|Number} limit - The limit query parameter to validate.
 * @param {Number} page - The page query parameter to validate.
 * @returns {Array} - Returns an array with a boolean indicating if the validation passed and a message if it failed.
 * @memberof module:utils/validations
 */
const validateQueries = (note, type, limit, page) => {

    if(!isValidNoteId(note)){
        return [
            false, `Invalid format for 'note' query parameter ('${note}'). Expected values: 'c', 'a_sharp', 'g_flat', etc.`];
    }

    if(!isValidChordTypeId(type)){
        return [
            false, `Invalid format for 'type' query parameter ('${type}'). Expected values: 'major', 'minor', etc.`];
    }

    if(!isValidLimit(limit)){
        return [
            false, `Invalid format for 'limit' query parameter ('${limit}'). Expected values: 'all', '2', '3', etc.`
        ]
    }

    if(!isValidPage(page)){
        return [
            false, `Invalid format for 'page' query parameter ('${page}'). Expected values: '1', '2', '3', etc.`
        ]
    }

    return [true];

}

/**
 * Validate chord id path parameter
 * @param {String} chordId - The chordId parameter to validate.
 * @returns {Array} - Returns an array with a boolean indicating if the validation passed and a message if it failed.
 * @memberof module:utils/validations
 */
const validateChordParam = (chordId) => {

    if(!isValidChordId(chordId)){
        return [
            false, 
            `Invalid format for 'chord Id' path parameter ('${chordId}'). Expected values: 'c_major', 'a_sharp_minor', 'g_flat_dim', 'f_7' etc.`
        ];
    }

    return [true];
}

/**
 * Validate chord type id path parameter
 * @param {String} chordTypeId - The chordTypeId path parameter to validate.
 * @returns {Array} - Returns an array with a boolean indicating if the validation passed and a message if it failed.
 * @memberof module:utils/validations
 */
const validateChordTypeParam = (chordTypeId) => {
    
    if(!isValidChordTypeId(chordTypeId)){
        return [
            false, 
            `Invalid format for 'type Id' path parameter ('${chordTypeId}'). Expected values: 'major', 'minor', etc.`
        ];
    }
    return [true];
}


module.exports = {validateQueries, validateChordParam, validateChordTypeParam, calculateValidChords, isValidChordId, isValidNoteId, isValidChordTypeId, isValidLimit, isValidPage};