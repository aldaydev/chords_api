class ResError {
    constructor(message, status = '500' ){
        this.message = message;
        this.status = status;
    }

    //Method to add a ResError instance to resErrors object
    add (key){
        resErrors[key] = this;
        return key;
    }
}

const resErrors = {

    // ---------- STATUS 500 ----------

    internalServerError: new ResError(
        'Error interno en el servidor. Inténtalo más tarde.',
        500
    ),

    unexpected: new ResError (
        'Error inesperado en el servidor.',
        500
    ),

    // ---------- STATUS 400 ----------

    badRequest: new ResError(
        'Solicitud incorrecta. Verifica los datos enviados.',
        400
    ),

    notFound: new ResError(
        'El recurso no se encontró. Inténtalo más tarde.',
        404
    )
}

module.exports = {ResError, resErrors};