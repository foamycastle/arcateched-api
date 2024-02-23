export type ArcatechedOperation=
    'ServerLoad'|
    'RouterInit'|
    'BodyParse'|
    'Helper'|
    'Query'|
    never

export type ErrorResponseObject={
    errorString?:string
    details?:object
}

export interface ArcatechedErrorInterface extends Error{
    httpCode:400|401|403|404|405|406|411|413|414|500|501|503|505|number
    message:string;
    operation?:ArcatechedOperation
    responseObject:ErrorResponseObject
}

export abstract class ArcatechedError extends Error implements ArcatechedErrorInterface{
    abstract message:string
    abstract operation?:ArcatechedOperation
    abstract httpCode: 400 | 401 | 403 | 404 | 405 | 406 | 411 | 413 | 414 | 500 | 501 | 503 | 505;
    responseObject: ErrorResponseObject;
}