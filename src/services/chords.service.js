/**
 * Chords service using MongoDB.
 * Performs operations related to the "Chord" Model in MongoDB (Mongoose)
 * 
 * @module services/chords
 * 
 * @requires models/chord
 * @requires utils/resErrors
 * @requires utils/logErrors
 */

const Chord = require('../models/chords.model.js');
const { ResError } = require('../utils/error.responses.js');
const { LogError } = require('../utils/error.logs.js');

const chordService = {

    /**
     * Uses mongoose to get and/or filter chords based on query parameters.
     * 
     * This function gets the chords from the database, applies filters and pagination based on query parameters.
     * 
     * It also aplies some populates to get the referenced data from 'notes', 'noteId' and 'typeId'.
     * 
     * @memberof module:services/chords
     * @function
     * @async
     * @param {Object} filter - The filter object to aplly on the query.
     * @param {Number} limitNum - The number of results to limit the query to.
     * @param {Number} skip - The number of results to skip for pagination.
     * @param {Number} pageNum - The current page number for pagination.
     * @returns {Object} - An object containing the filtered chords, total count, current page, and total pages.
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    filter: async (filter, limitNum, skip, pageNum) => {
        try {

            //Finding chords that match the filter
            const chords = await Chord.find(filter)
                //Applying 'limit'
                .limit(limitNum)
                //Applying 'skip'
                .skip(skip)
                //Getting 'noteId' referenced data
                .populate({
                    path: "noteId",
                    select: "-_id" //We get everything except id
                })
                //Getting 'notes' referenced data
                .populate({
                    path: "notes", 
                    select: "name -_id" //We get just the name
                })
                //Getting 'typeId' referenced data
                .populate({
                    path: "typeId",
                    select: "-_id" //We get everything except id
                });
            
                //Getting the count of all chords that match the filter
                const chordsCount = await Chord.countDocuments(filter);
                //Calculating total number of pages. If no 'limitNum', is just 1 page
                const totalPages = limitNum ? Math.ceil(chordsCount / limitNum) : 1;
                //Checking pageNum
                if(totalPages === 1) pageNum = 1;

                //Final return to controller
                return {
                    count: chordsCount,
                    currentPage: pageNum,
                    totalPages: totalPages,
                    limit: limitNum,
                    data: chords
                }

        } catch (error) {
            //New log error
            const chordsLogError = new LogError({
                message: 'MongoDB - Error at getting chords',
                error: error
            }).add('chordsLogError');

            //New response Error
            const chordResError = new ResError({
                message: 'Error at getting chords. Please try again later.',
                status: 500
            }).add('chordResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordResError, logCode: chordsLogError});
        }
    },


    /**
     * Uses mongoose to get a unique chord by its "_id".
     * 
     * This function gets the chords from the database, applies filters and pagination based on query parameters.
     * 
     * It also aplies some populates to get the referenced data from 'notes', 'noteId' and 'typeId'.
     * 
     * @memberof module:services/chords
     * @function
     * @async
     * @param {String} _id - The id of the chord to retrieve.
     * @returns {Object} - An object containing the selected chord data.
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    getById: async (_id) => {
        try {
            
            //Getting chord by id
            const chordById = await Chord.find({_id})
                //Getting 'noteId' referenced data
                .populate({
                    path: "noteId",
                    select: "-_id" //We get everything except id
                })
                //Getting 'notes' referenced data
                .populate({
                    path: "notes", 
                    select: "name -_id" //We get just the name
                })
                //Getting 'typeId' referenced data
                .populate({
                    path: "typeId",
                    select: "-_id" //We get everything except id
                });
            
                //Returning selected element
                return chordById[0];

        } catch (error) {
            //New log error
            const chordByIdLogError = new LogError({
                message: 'MongoDB - Error at getting a chord by id',
                error: error
            }).add('chordByIdLogError');

            //New response Error
            const chordByIdResError = new ResError({
                message: 'Error at getting chord by id. Please try again later.',
                status: 500
            }).add('chordByIdResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordByIdResError, logCode: chordByIdLogError});
        }
    }
}

module.exports = chordService;