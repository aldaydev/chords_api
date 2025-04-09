const swaggerJsDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

//Loading YAML files
const notesSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/notes.yaml'));
const chordTypesSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/chordTypes.yaml'));
const chordsSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/chords.yaml'));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chords API - Documentation",
            version: "1.0.0",
            description: "Chords API Documentation with Swagger. \n \n [Return to documentation page](/) \n \n Author: Rafael Alday (AldayDev) \n \n [Contact](mailto:aldaydev@gmail.com) | [Visit alday.dev](https://alday.dev)"
        },
        tags: [
            { name: 'Notes', description: 'Operations related to notes.' },
            { name: 'Chord Types', description: 'Operations related to chord types.' },
            { name: 'Chords', description: 'Operations related to chords.' }
            // ... more tags
        ],
        servers: [
            {
                url: "http://127.0.0.1:2202",
            },
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