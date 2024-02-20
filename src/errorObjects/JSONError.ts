import {ErrorResponseType} from "./ArcatechedAPIRuntimeError";
import {ArcatechedValidationError} from "./ArcatechedValidationError";

export class JSONError extends ArcatechedValidationError{
    constructor(message:string) {
        super(message,{},400);
    }
    responseObject(): ErrorResponseType {
        return {
            message:this.message,
            errorType:"JSONParseError"
        }
    }
}