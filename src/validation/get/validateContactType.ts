import Prisma from '@prisma/client'
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction){

    if(contactType in Prisma.contactType){
        next()
        return
    }
    res
        .status(400)
        .json({
            error:{
                message:`'${contactType}' is not a valid contact type`
            }
        })
}

