// to get a better messages with error code 

class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;