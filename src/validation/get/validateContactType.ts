import Prisma from '@prisma/client'
import {NextFunction, Request, Response} from "express";
import {contactType} from "../schemas/enums/contactType";

export default function (req:Request,res:Response,next:NextFunction){

    const findJoi = contactType.validate(req.body)

    if(findJoi.error) {
        res
            .status(400)
            .json({
                error: findJoi.error
            })
        return
    }

    next()

}

