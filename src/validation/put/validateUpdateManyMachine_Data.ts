import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {machine_dataUpdateValidationSchema} from "../schemas/machine_data_update_validation_schema";

export default async function validateUpdateManyMachine_Data(input:Request, res:Response, next:NextFunction){
    const validateArray=Joi.array()
        .items(machine_dataUpdateValidationSchema)
        .validate(input.body)

    if(validateArray.error){
        res
            .status(400)
            .json({
                error: validateArray.error
            })
    }

    next()
}
