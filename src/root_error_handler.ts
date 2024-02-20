import {ArcatechedAPIRuntimeError} from "./errorObjects/ArcatechedAPIRuntimeError";
import {NextFunction} from "express";

export default function (err:any,req:any,res:any,next:NextFunction){

    if(res.headersSent){
        next(err)
    }
    if(err instanceof ArcatechedAPIRuntimeError){
        res.status(err.code).json(err.responseObject())
    }
}