import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import {gameType} from "@prisma/client";
import {machine_dataUpdateValidationSchema} from "../schemas/machine_data/machine_data_update_validation_schema";

export default async function validateUpdateMachine_Data(input:Request, res:Response, next:NextFunction){
    const validated= machine_dataUpdateValidationSchema.validate(input.body)
        if(validated.error){
            next('route')
        }
        next()
}
