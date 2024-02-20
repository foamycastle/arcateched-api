import {ArcatechedAPIRuntimeError} from "./errorObjects/ArcatechedAPIRuntimeError";

export default function (err:any,req:any,res:any){

    if(err instanceof ArcatechedAPIRuntimeError){
        res.status(err.code).json(err.responseObject())
    }
}