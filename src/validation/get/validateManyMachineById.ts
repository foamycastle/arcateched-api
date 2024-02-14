import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction){
    const validateBodyArray:Joi.ValidationResult<any[]> = Joi.array()
        .items(
            Joi
                .string()
                .uuid({
                    version:[
                        'uuidv1',
                        'uuidv4'
                    ]
                })
        ).validate(req.body)

    if(validateBodyArray.error){
        res
            .status(400)
            .json({
                message:"Validation Error",
                error:validateBodyArray.error
            })
        return
    }

    next()


}