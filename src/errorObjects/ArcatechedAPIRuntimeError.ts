export type ErrorResponseType={
    message:string,
    errorType?:string,
    details?:object
}

export interface errorCodeNumber{
    code:number
}
export interface errorCodeString{
    code:number
}
export type ArcatechedRuntimeError<Details,Code> ={
    message:string,
    details:Details,
    code:Code extends string ? string : Code extends number ? number : never
}
export interface ArcatechedAPIRuntimeErrorInterface extends ArcatechedRuntimeError<any, number|string>{
    responseObject():ErrorResponseType
}
export class ArcatechedAPIRuntimeError extends Error implements ArcatechedAPIRuntimeErrorInterface{

    details: any;
    code: number|string;
    constructor(message:string,details:any, code: string|number) {
        super(message);
        this.message=message;
        this.details=details;
        this.code=code
    }

    responseObject(): ErrorResponseType{
        return{
            message:this.message,
            details:this.details
        }
    }
}