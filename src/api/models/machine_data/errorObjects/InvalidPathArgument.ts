import Joi from "joi";
import {ErrorResponseType} from "../../../../errorObjects/ArcatechedAPIRuntimeError";
import {ArcatechedValidationError} from "../../../../errorObjects/ArcatechedValidationError";
export class InvalidPathArgument extends ArcatechedValidationError{
    constructor(message:string,details?:object|Joi.ValidationError,code?:string|number) {
        super(message,details,code)
    }
    errorResponse():ErrorResponseType {
        return {
            message:this.message,
            errorType:"InvalidPathArgument"
        };
    }

}