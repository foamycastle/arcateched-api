import {MachineDataOp} from "../MachineDataOp";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {JoiValidationError} from "../../errorObjects/JoiValidationError";
import {opState} from "../../validation/opState";

interface extendRequest extends Request {
    validationResult: Joi.ValidationResult
}

export class getMachineByOpState extends MachineDataOp {
    constructor(routePath: string) {
        super();
        this.routeDefinition = routePath
        this.queryObject = {
            where:{
                opState:""
            },
            select:{
                id:true,
                name:true,
                opState:true
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

            req.validationResult = opState().validate(req.body)
            if (req.validationResult.error) {
                next(new JoiValidationError(req.validationResult.error.message, req.validationResult.error, 400))
                return
            }

            next()
        }
    }

    queryPrep() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('query prep')
            this.queryObject.where.opState=req.validationResult.value[0]
            next()
        }
    }
}