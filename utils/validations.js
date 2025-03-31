const validations = {

    note: (note) => {

        const validNotes = ['ab', 'a', 'a#', 'bb', 'b', 'c', 'c#', 'db', 'd', 'd#', 'eb', 'e', 'f', 'f#', 'gb', 'g', 'g#'];

        console.log(note);

        return validNotes.includes(note);

        // console.log(validateNote);

    }

}

module.exports = validations;