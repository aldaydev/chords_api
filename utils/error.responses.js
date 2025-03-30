//Custom log error class
class ResError {
    constructor({message, status = '500'}){
        this.message = message;
        this.status = status;
    }

    //Method to add a ResError instance to resErrors object
    add (key){
        resErrors[key] = this;
        return key;
    }
}

//logErrors object that contains the 'resCode' of custom and predefined log errors
const resErrors = {

    // ---------- PREDEFINED ERRORS - STATUS 500 ----------

    internalServerError: new ResError({
        message: {
            eng: 'Internal server error. Please try again later.',
            spa: 'Error interno en el servidor. Por favor, inténtalo más tarde.'
        },
        status: 500
    }),

    unexpected: new ResError ({
        message: {
            eng: 'An unexpected server error has occurred. Please try again later.',
            spa: 'Error inesperado en el servidor. Por favor, inténtalo más tarde.'
        },
        status: 500
    }),

    // ---------- PREDEFINED ERRORS - STATUS 400 ----------

    badRequest: new ResError({
        message: {
            eng: 'Incorrect request. Please check the submitted data.',
            spa: 'Solicitud incorrecta. Por favor, verifica los datos enviados.'
        },
        status: 400
    }),

    notFound: new ResError({
        message: {
            eng: 'The resource was not found. Please try again later.',
            spa: 'El recurso no se encontró. Por favor, inténtalo más tarde.'
        },
        status: 400
    })
}

module.exports = {ResError, resErrors};