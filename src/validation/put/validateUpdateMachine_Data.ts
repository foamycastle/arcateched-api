import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import {gameType} from "@prisma/client";
import {machine_dataUpdateValidationSchema} from "../schemas/machine_data_update_validation_schema";

export default async function validateUpdateMachine_Data(input:Request, res:Response, next:NextFunction){
    await machine_dataUpdateValidationSchema.validateAsync(input.body)
        .then((validated)=>{
            if(validated.error){
                res
                    .status(400)
                    .json({
                        error:{
                            validationError:validated.error.details
                        }
                    })
            }
            next()
        })
}
