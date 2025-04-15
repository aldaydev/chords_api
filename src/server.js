/**
 * This file initializes the server, sets up middleware, and connects to the MongoDB database.
 * @module server
 */

//Initializing env variables
require('dotenv').config();

//Initializing logger
const logger = require('./config/logger.config.js');

//Initializing express
const express = require('express');
const {json, urlencoded} = require('express');
const app = express();

//CORS configuration
const cors = require('cors');

//router import
const apiRoutes = require('./routes/api.routes.js');
const docRoutes = require('./routes/doc.routes.js');

//Import mongoConnection
const mongoConnection = require('./databases/mongo.connection.js');

//Import error middlewares
const errorMiddleware = require('./middlewares/error.middleware.js');
const notFoundMiddleware = require('./middlewares/notFound.middleware.js');

//Swagger imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.config.js');

//Path imports
const path = require('path');


//Global middlewares
app.use(json());
app.use(urlencoded({extended: true}));

app.use(cors({
    origin: `*`,
    mehtods: ['GET']
}));

//EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Static files
app.use(express.static('public'));

//Routes
app.use('/v1', apiRoutes);
app.use('/', docRoutes);


//Swagger configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/jsdoc', express.static(path.join(__dirname, '../docs/jsdoc')));

//Error middlewares
app.use(errorMiddleware);
app.use('/v1', notFoundMiddleware);
app.use((req, res) => {
    res.status(404).render('pages/404', { url: req.url} );
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

//Port config
const PORT = process.env.PORT || 3001;


/**
 * Function to run the server and connect to MongoDB.
 * It shows a successful log message or catches an error if it fails to connect.
 * 
 * @async
 * @function runServer
 * @returns {Promise<void>} - A promise that resolves when the server is running.
 * @throws {Error} - Throws an error if the server fails to initialize.
 * @memberof module:server
 */
const runServer = async () => {
    try{
        //MondoDB connection
        await mongoConnection();

        //Initializing server
        app.listen(PORT, () => {
            logger.info(`Server - Running on http://localhost:${PORT}`);
        })

    }catch(error){
        logger.error('Server - Error initializing');
    }
}

runServer();