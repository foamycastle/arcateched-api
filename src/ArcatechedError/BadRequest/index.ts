import {ArcatechedError, ErrorResponseObject} from "../index";

export abstract class BadRequest extends ArcatechedError {
    httpCode:400
}