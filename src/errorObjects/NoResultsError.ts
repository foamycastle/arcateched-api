import {ArcatechedAPIRuntimeError, ErrorResponseType} from "./ArcatechedAPIRuntimeError";

export class NoResultsError extends ArcatechedAPIRuntimeError{
    constructor(message?:string,details?:object) {
        super(message??"No results",details??{},404);
    }
    responseObject(): ErrorResponseType {
        return {
            message:this.message,
            errorType:"NoResultsError"
        }
    }

}