import {BadRequest} from "../index";
import {ArcatechedOperation, ErrorResponseObject} from "../../index";

export class MalformedRequest extends BadRequest {
    message:string
    operation:ArcatechedOperation
    responseObject:ErrorResponseObject
    constructor(message: string, details?:object) {
        super()
        this.message=message
        this.httpCode=400
        this.operation="BodyParse"
        this.responseObject={
            details:details,
            errorString:this.message
        }
    }
}