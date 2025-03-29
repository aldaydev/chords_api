//Initializing env variables
require('dotenv').config();

//Initializing logger
const logger = require('./config/logger.config.js');

//Initializing express
const express = require('express');
const {json, urlencoded} = require('express');
const app = express();

//router import
const router = require('./routes/router.js');

//Import mongoConnection
const mongoConnection = require('./databases/mongo.connection.js');

//Import error middlewares
const errorMiddleware = require('./middlewares/error.middleware.js');
const notFoundMiddleware = require('./middlewares/notFound.middleware.js');

//Global middlewares
app.use(json());
app.use(urlencoded({extended: true}));

//Router redirection
app.use('/api/v1', router);

//Error middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

//Port config
const PORT = process.env.PORT || 3001;

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