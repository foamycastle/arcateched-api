import Joi from "joi";
import {NextFunction, Request, RequestParamHandler, Response} from "express";
import {UUID} from "../../../validation/schemas/UUID";
import Prisma, {$Enums} from "@prisma/client";
import {machine_dataCreateValidationSchema} from "./validation/machine_data_create_validation_schema";
import {machine_dataUpdateValidationSchema} from "./validation/machine_data_update_validation_schema";
export const machine_id_array=(req:Request,res:Response,next:NextFunction)=>{
    const findJoi = Joi.array().items(UUID).min(1).validate(req.body)

    if(findJoi.error){
        res.status(400).json({
            error:findJoi.error
        })
        return
    }
    next()


}
export const validateOpState:RequestParamHandler=(req:Request,res:Response,next:NextFunction,state:string)=>{
    if(!Prisma.opState[state]){
        next(new Error(`'${state}' is not a valid operational state`))
        return
    }
    next()
}
export const validateGameType=(req:Request,res:Response,next:NextFunction):void => {
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
export const validateCreateMachine_Data=(input:Request, res:Response, next:NextFunction):void =>{
    const findJoi= machine_dataCreateValidationSchema.validate(input.body)
    if(findJoi.error){
        res
            .status(400)
            .json({
                error:{
                    validationError:findJoi.error
                }
            })
        return
    }
    next()
}
export const validateUpdateMachine_Data=(input:Request, res:Response, next:NextFunction):void=>{

    const validated= machine_dataUpdateValidationSchema.validate(input.body)

    if(validated.error){
        res
            .status(400)
            .json({error: validated.error})
        return
    }
    next()
}
