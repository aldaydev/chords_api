/**
 * ChordType service using MongoDB.
 * Performs operations related to the "ChordTypes" Model in MongoDB (Mongoose)
 * 
 * @module services/chordTypes
 * 
 * @requires models/chordType
 * @requires utils/errorResponses
 * @requires utils/errorLogs
 */

const ChordType = require('../models/chordType.model.js');
const { ResError } = require('../utils/error.responses.js');
const { LogError } = require('../utils/error.logs.js');

const chordTypeService = {

    /**
     * Uses mongoose to get all chord types from MongoDB.
     * 
     * @memberof module:services/chordTypes
     * @function
     * @async
     * @returns {Object} - An object containing all chord types data.
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    getAll: async () => {
        try {
            //Returning all chord types
            return await ChordType.find();
        } catch (error) {

            //New log error
            const chordTypesLogError = new LogError({
                message: 'MongoDB - Error at getting chord types',
                error: error
            }).add('chordTypesLogError');

            //New response Error
            const chordTypesResError = new ResError({
                message: 'Error at getting chord types list. Please try again later.',
                status: 500
            }).add('chordTypesResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordTypesResError, logCode: chordTypesLogError});
        }
    },


    /**
     * Uses mongoose to get a unique chordType by its "_id".
     * 
     * @memberof module:services/chordTypes
     * @function
     * @async
     * @param {String} _id - The id of the chord type to retrieve.
     * @returns {Object} - An object containing the selected chord type data.
     * @throws {Error} Throws an error if there is an issue with the database.
     */
    getById: async (_id) => {
        try {
            
            //Getting chord types by id
            const chordTypeById = await ChordType.find({_id});

            //Returning selected chord type
            return chordTypeById[0];

        } catch (error) {
            //New log error
            const chordTypeByIdLogError = new LogError({
                message: 'MongoDB - Error at getting a chord type by id',
                error: error
            }).add('chordTypeByIdLogError');

            //New response Error
            const chordTypeByIdResError = new ResError({
                message: 'Error at getting chord type by id. Please try again later.',
                status: 500
            }).add('chordTypeByIdResError');

            //Throw an error -> resCode + logCode
            throw({resCode: chordTypeByIdResError, logCode: chordTypeByIdLogError});
        }
    }

}

module.exports = chordTypeService;