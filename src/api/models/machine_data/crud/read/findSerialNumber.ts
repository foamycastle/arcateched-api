import {MachineDataOp} from "../MachineDataOp";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {JoiValidationError} from "../../errorObjects/JoiValidationError";
import {serialNumberWithSearchMethodObject} from "../../validation/serialNumber";

interface extendRequest extends Request {
    validationResult: Joi.ValidationResult
}

export class findSerialNumber extends MachineDataOp {
    constructor(routePath: string) {
        super();
        this.routeDefinition = routePath
        this.queryObject = {
            where:{
                serialNumber:{
                    mode:"insensitive"
                }
            },
            select:{
                id:true,
                name:true,
                serialNumber:true
            }
        }
    }

    run(input?: object): Promise<any> {
        console.log('run')
        return this.prismaClient[this.model].findMany(this.queryObject)
    }

    validationHandler() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('validation')

            req.validationResult = serialNumberWithSearchMethodObject().validate(req.body)
            if (req.validationResult.error) {
                next(new JoiValidationError(req.validationResult.error.message, req.validationResult.error, 400))
            }

            next()
        }
    }

    queryPrep() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('query prep')

            this.queryObject.where.serialNumber[req.validationResult.value.searchMethod??"contains"]=req.validationResult.value.serialNumber
            console.log()

            next()
        }
    }
}