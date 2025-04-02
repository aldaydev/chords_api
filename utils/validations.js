const validNotes = ['ab', 'a', 'a#', 'bb', 'b', 'c', 'c#', 'db', 'd', 'd#', 'eb', 'e', 'f', 'f#', 'gb', 'g', 'g#'];
const validChordTypes = ['major', 'minor', 'dim', '7'];


const calculateValidChords = () => {

    let allValidChords = [];

    for(let i = 0; i < validNotes.length; i++){
        for(let j = 0; j < validChordTypes.length; j++){
            allValidChords.push(validNotes[i] + '_' + validChordTypes[j]);
        }
    }

    return allValidChords;

}

const validChords = calculateValidChords();

const isValidNote = (note) => {
    if(note && !validNotes.includes(note)){
        return false;
    }else{
        return true;
    }
}

const isValidChordType = (type) => {
    if(type && !validChordTypes.includes(type)){
        return false;
    }else{
        return true;
    }
}

const isValidLimitOrPage = (value) => {
    if (value !== undefined && (!/^\d+$/.test(value) || parseInt(value) <= 0)) {
        return false;
    }else{
        return true;
    }
}

const validateQueries = (note, type, limit, page) => {

    if(!isValidNote(note)){
        return [
            false, `Invalid format for 'note' query parameter ('${note}'). Expected values: 'c', 'a#', 'gb', etc.`];
    }

    if(!isValidChordType(type)){
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


module.exports = validateQueries;