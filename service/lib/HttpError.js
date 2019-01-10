/**
 * HttpError wrapper class
 *
 * Created by jcooley on 5/14/18.
 */

class HttpError {
    constructor(code, message) {
        this.name = 'HttpError';
        this.message = message;
        this.code = code;
    }

    getDescription() {
        return `${this.code}: ${this.message}`;
    }

}

module.exports = HttpError;