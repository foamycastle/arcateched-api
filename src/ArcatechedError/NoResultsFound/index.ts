import {ArcatechedError, ArcatechedOperation} from "../index";

export class NoResultsFound extends ArcatechedError{
    message: string;
    httpCode:404
    operation:ArcatechedOperation
    constructor(message?:string) {
        super()
        this.message=message
        this.httpCode=404
        this.operation = 'Query'
        this.responseObject.errorString=this.message
    }

}