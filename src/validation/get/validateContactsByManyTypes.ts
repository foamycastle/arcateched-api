import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import Prisma from "@prisma/client"
export default function (req:Request,res:Response,next:NextFunction){
    let ctTypes:Array<string> =[];
    for(const ct in Prisma.$Enums.contactType){
        ctTypes.push(ct)
    }
    const findJoi = Joi.array()
        .items(Joi.string().valid(...ctTypes))
        .min(2)
        .validate(req.body)

    if(findJoi.error){
        res
            .status(400)
            .json({
                error:{
                    message:findJoi.error.message,
                    details:findJoi.error.details,
                    cause:findJoi.error.cause
                }
            })
        return
    }
    next()
}