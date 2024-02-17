import {NextFunction, Request, Response} from "express";
import {contactType} from "../../../validation/schemas/enums/contactType";

export const validateContactType=(req:Request,res:Response,next:NextFunction)=>{

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
export const validateContactName=(req:Request,res:Response,next:NextFunction):void=>{
    const findJoi = Joi.object<Prisma.contactsWhereInput>({
        name:Joi.string().min(1).max(32).required().insensitive().alphanum()
    }).validate(req.body)

    if(findJoi.error){
        res.status(400).json(findJoi.error)
        return
    }
    next()

}
export const validateContactId=(req:Request,res:Response,next:NextFunction,state:string):void=>{
    const findJoi=UUID.validate(state)

    if(findJoi.error){
        res.status(400).json(findJoi.error)
        return
    }
    next()
}
