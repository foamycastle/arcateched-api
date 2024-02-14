import Prisma from '@prisma/client'
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction,contactType:string){

    if(Prisma.contactType[contactType]){
        next()
        return
    }
    res
        .status(400)
        .json({
            error:{
                message:`'${req.params.type}' is not a valid contact type`
            }
        })
}

