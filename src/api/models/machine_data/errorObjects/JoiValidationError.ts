import {ErrorResponseType} from "../../../../errorObjects/ArcatechedAPIRuntimeError";
import Joi from "joi";
import {ArcatechedValidationError} from "../../../../errorObjects/ArcatechedValidationError";

export class JoiValidationError extends ArcatechedValidationError{
    constructor(message:string,details:Joi.ValidationError,code:number|string) {
        super(message,details,code);
    }
    errorResponse(): ErrorResponseType{
        return{
            message:this.message,
            errorType:"JoiValidationError",
            details:this.details,
        }
    }

}