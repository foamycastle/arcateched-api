import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export default function (req:Request,res:Response,next:NextFunction){
    const findThisMachineId=req.params.id;
    const findJoi=Joi
        .string()
        .uuid({
            version:[
                'uuidv1',
                'uuidv4'
            ]
        })

    let errorMessage:string=''

    if(!findThisMachineId){
        errorMessage="Please submit a machine identifier"
        const joiError=findJoi.validate(findThisMachineId).error
        if(joiError){
            errorMessage = joiError.message
        }
    }

    if(errorMessage===''){
        next()
        return
    }

    res
        .status(400)
        .json({
            error:{
                message:"Identifier is not a valid UUID"
            }
        })
}