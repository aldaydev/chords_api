//Array of valid note Ids
const validNotes = ['a_flat', 'a', 'a_sharp', 'b_flat', 'b', 'c', 'c_sharp', 'd_flat', 'd', 'd_sharp', 'e_flat', 'e', 'f', 'f_sharp', 'g_flat', 'g', 'g_sharp'];

//Array of valid chord type Ids
const validChordTypes = ['major', 'minor', 'dim', '7'];

//Function to calculate valid chord Ids (note_type)
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

//Validate chord id
const isValidChordId = (chordId) => {
    if(!chordId || !validChords.includes(chordId)){
        return false;
    }else{
        return true;
    }
}

//Validate note id
const isValidNoteId = (noteId) => {
    if(noteId && !validNotes.includes(noteId)){
        return false;
    }else{
        return true;
    }
}

//Validate chord type id
const isValidChordTypeId = (typeId) => {
    if(typeId && !validChordTypes.includes(typeId)){
        return false;
    }else{
        return true;
    }
}

//Validate limit or page (number)
const isValidLimitOrPage = (value) => {
    if (value !== undefined && (!/^\d+$/.test(value) || parseInt(value) <= 0)) {
        return false;
    }else{
        return true;
    }
}

//---------- VALIDATION FUNCTIONS ----------//

//Validate all query parameters
const validateQueries = (note, type, limit, page) => {

    if(!isValidNoteId(note)){
        return [
            false, `Invalid format for 'note' query parameter ('${note}'). Expected values: 'c', 'a_sharp', 'g_flat', etc.`];
    }

    if(!isValidChordTypeId(type)){
        return [
            false, `Invalid format for 'type' query parameter ('${type}'). Expected values: 'major', 'minor', etc.`];
    }

    if(!isValidLimitOrPage(limit)){
        return [
            false, `Invalid format for 'limit' query parameter ('${limit}'). Expected values: 'all', '2', '3', etc.`
        ]
    }

    if(!isValidLimitOrPage(page)){
        return [
            false, `Invalid format for 'page' query parameter ('${page}'). Expected values: '1', '2', '3', etc.`
        ]
    }

    return [true];

}

//Validate chord id path parameter
const validateChordParam = (chordId) => {

    if(!isValidChordId(chordId)){
        return [
            false, 
            `Invalid format for 'chord Id' path parameter ('${chordId}'). Expected values: 'c_major', 'a_sharp_minor', 'g_flat_dim', 'f_7' etc.`
        ];
    }

    return [true];
}

//Validate chord type id path parameter
const validateChordTypeParam = (chordTypeId) => {
    
    if(!isValidChordTypeId(chordTypeId)){
        return [
            false, 
            `Invalid format for 'type Id' path parameter ('${chordTypeId}'). Expected values: 'major', 'minor', etc.`
        ];
    }
    return [true];
}


module.exports = {validateQueries, validateChordParam, validateChordTypeParam};