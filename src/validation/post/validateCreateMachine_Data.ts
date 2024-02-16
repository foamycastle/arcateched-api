import {NextFunction, Request, Response} from "express";
import {machine_dataCreateValidationSchema} from "../schemas/machine_data/machine_data_create_validation_schema";

export default function validateCreateMachine_Data(input:Request, res:Response, next:NextFunction){
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
