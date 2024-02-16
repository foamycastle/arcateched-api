import Joi from "joi";
import Prisma, {$Enums} from "@prisma/client";
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction) {
    const findJoi= Joi.array<Prisma.gameType>()
        .items(
            Joi.string()
                .valid(...Object.keys($Enums.gameType))
        ).validate(req.body)

    if(findJoi.error){
        res
            .status(400)
            .json({
                error:findJoi.error
            })
        return
    }
    next();

}