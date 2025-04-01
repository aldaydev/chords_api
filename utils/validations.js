const validNotes = ['ab', 'a', 'a#', 'bb', 'b', 'c', 'c#', 'db', 'd', 'd#', 'eb', 'e', 'f', 'f#', 'gb', 'g', 'g#'];
const validChordTypes = ['major', 'minor', 'dim', '7'];

const isValidNote = (note) => {
    if(note && !validNotes.includes(note)){
        return false;
    }else{
        return true;
    }
}

const validations = (note, type, limit, page) => {

    console.log('ValidNote', isValidNote(note));

    if(!isValidNote(note)){
        return [
            false, {
                eng: 'Invalid format of note. Please, check query params data.', 
                spa: 'Formato de nota inválido. Por favor, revisa los parámetros de filtrado.'
            }];
    }

}



// const validations = {
//     note: (note) => {

//         console.log(note);

//         if(note && validNotes.includes(note)){
//             return false;
//         }else{
//             return true;
//         }
//     }
// }

module.exports = validations;