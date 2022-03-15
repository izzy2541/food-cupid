//Custom error utility class

class ApiError {
    //class properties
    constructor(code, message, err) {
        this.code = code;
        this.message = message;
        this.err = err;
    }

    //class methods
    // 404 Bad Request
    static badRequest(msg) {
        return new ApiError(400, `Bad Request: ${msg}`)
    }

    //404 not found
    static notFound() {
        return new ApiError(404, 'Resource Not Found')
    }

    //[500] Internal Server Error
    static internal(msg, err){
        console.error(err);
        return new ApiError(500, `Internal Server Error: ${msg}`);
    }
}

module.exports = ApiError;