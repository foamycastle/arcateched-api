import {ArcatechedError, ArcatechedOperation, ErrorResponseObject} from "../index";

export class NoResultsFound extends ArcatechedError{
    message: string;
    httpCode:404
    operation:ArcatechedOperation
    responseObject:ErrorResponseObject
    constructor(message?:string) {
        super()
        this.message=message
        this.httpCode=404
        this.operation = 'Query'
    }

}