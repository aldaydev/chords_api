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
const router = require('./routes/router.js');

//Import mongoConnection
const mongoConnection = require('./databases/mongo.connection.js');

//Import error middlewares
const errorMiddleware = require('./middlewares/error.middleware.js');
const notFoundMiddleware = require('./middlewares/notFound.middleware.js');

//Swagger imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.config.js');


//Global middlewares
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: `*`,
    mehtods: ['GET']
}));

//Router redirection
app.use('/v1', router);

//Swagger configuration
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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