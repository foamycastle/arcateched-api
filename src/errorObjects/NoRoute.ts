import {ArcatechedAPIRuntimeError, ErrorResponseType} from "./ArcatechedAPIRuntimeError";

export class NoRouteError extends ArcatechedAPIRuntimeError{

    protected route:string|null;
    constructor(message:string, route?:string) {
        super(message,{},503);
        this.route=route??null
    }
    responseObject(): ErrorResponseType {
        return {
            message:this.message,
            errorType:"NoRouteError",
            details:{
                route:this.route??"?"
            }
        }
    }

}