const mongoConfig = {
    uri: process.env.DB_URI,
    options: {
        //Max time mongoose waits to initial connection
        connectTimeoutMS: 3000,
        //Time mongoose waits to close an inactive connection
        socketTimeoutMS: 5000,
        //Time mongoose will try to find a server before surrender
        serverSelectionTimeoutMS: 3000,
    }
}

module.exports = mongoConfig;