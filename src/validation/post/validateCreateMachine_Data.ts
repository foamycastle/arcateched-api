import {NextFunction, Request, Response} from "express";
import {machine_dataCreateValidationSchema} from "../schemas/machine_data_create_validation_schema";

export default async function validateCreateMachine_Data(input:Request, res:Response, next:NextFunction){
    await machine_dataCreateValidationSchema.validateAsync(input.body)
        .then(validated=>{
            if(validated.error){
                res
                    .status(400)
                    .json({
                        error:{
                            validationError:validated.error
                        }
                    })
                return
            }
            next()
        })



}
