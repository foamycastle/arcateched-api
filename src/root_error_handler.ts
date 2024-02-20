import {NextFunction} from "express";
import {ArcatechedAPIRuntimeError} from "./errorObjects/ArcatechedAPIRuntimeError";

export default function (err:any,req:any,res:any,next:NextFunction){

    if(err instanceof ArcatechedAPIRuntimeError){
        res.status(err.code).json(err.responseObject())
    }
}