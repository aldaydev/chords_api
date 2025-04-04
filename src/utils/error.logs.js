//Custom log error class
class LogError {
    constructor({ message, error, status, endpoint }) {

        this.timestamp = new Date().toISOString();
        this.message = message;
        this.error = error || null;
        this.status = status || 500;

        //Taken from request
        this.endpoint = null;
    }

    //Method to add a LogError instance to logErrors object
    add (key){
        logErrors[key] = this;
        return key;
    }
};

//logErrors object that contains the 'logCode' of custom log errors
const logErrors = {};

module.exports = {LogError, logErrors};