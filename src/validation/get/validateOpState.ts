import Joi from "joi";
import Prisma from "@prisma/client";
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction,state:string){
    if(Prisma.opState[state]){
        next()
        return
    }

    res
        .status(400)
        .json({
            error:{
                message:`${state} is not a valid operational state`
            }
        })
}