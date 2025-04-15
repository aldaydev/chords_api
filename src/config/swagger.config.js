/**
 * Swagger configuration module for the API.
 * Contains an object with essential parameters to configure swagger.
 * @module config/swagger
 */

const swaggerJsDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

//Loading YAML files
const notesSwagger = YAML.load(path.resolve(__dirname, '../../docs/swagger/notes.yaml'));
const chordTypesSwagger = YAML.load(path.resolve(__dirname, '../../docs/swagger/chordTypes.yaml'));
const chordsSwagger = YAML.load(path.resolve(__dirname, '../../docs/swagger/chords.yaml'));

/**
 * Swagger configuration object
 * @memberof module:config/swagger
 * @type {Object}
 * @property {definition} definition - The OpenAPI definition object.
 * @property {string} definition.openapi - The OpenAPI version.
 * @property {object} definition.info - Information about the API.
 * @property {array} definition.tags - Tags for the API operations.
 * @property {array} definition.servers - Servers where the API is hosted.
 * @property {object} definition.components - Components for the API (Schemas and responses).
 * @property {object} apis - Paths to the YAML files containing the API documentation.
 */
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chords API - Documentation",
            version: "1.0.0",
            description: `Chords API Documentation with Swagger.<br><br>
                <a href="/">Return to web</a><br><br>
                Author: Rafael Alday (AldayDev)<br><br>
                <a href="mailto:aldaydev@gmail.com">Contact</a> | <a href="https://alday.dev">Visit alday.dev</a>`
        },
        tags: [
            { name: 'Notes', description: 'Operations related to notes.' },
            { name: 'Chord Types', description: 'Operations related to chord types.' },
            { name: 'Chords', description: 'Operations related to chords.' }
            // ... more tags
        ],
        servers: [
            { url: "https://www.chords.alday.dev", description: "Oficial url" },
            { url: "https://chords-api.onrender.com", description: "Render url" },

        ],
        components: {
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Internal server error. Please try again later."
                        },
                        status: {
                            type: "integer",
                            example: 500,
                        }
                    },
                },
            },
            responses: {
                internalServerError: {
                    description: "Internal Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            }
                        }
                    }
                },
                //More global responses...
            }
        },
    },
    apis: ["../docs/swagger/*.yaml"],
};

/**
 * Swagger documentation object generated from the YAML files.
 * It combines the paths from the loaded YAML files into a single object.
 * @type {Object}
 * @property {Object} definition - The main Swagger definition object, containing metadata.
 * @property {Object} definition.paths - Combined paths from different Swagger YAML files.
 */

const swaggerDocs = swaggerJsDoc({
    ...swaggerOptions,
    definition: {
        ...swaggerOptions.definition,
        paths: {
            ...notesSwagger.paths,
            ...chordTypesSwagger.paths,
            ...chordsSwagger.paths,
        },
    },
});

module.exports = swaggerDocs;