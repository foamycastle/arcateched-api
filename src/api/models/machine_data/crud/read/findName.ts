import {MachineDataOp} from "../MachineDataOp";
import {NextFunction, Request, Response} from "express";
import {ArcatechedAPIRuntimeError} from "../../../../../errorObjects/ArcatechedAPIRuntimeError";
import Joi from "joi";
import {UUID} from "../../../../../validation/schemas/UUID";
import {JoiValidationError} from "../../errorObjects/JoiValidationError";
import {NoResultsError} from "../../../../../errorObjects/NoResultsError";
import {nameRequired, nameWithSearchMethodObject} from "../../validation/name";

interface extendRequest extends Request {
    validationResult: Joi.ValidationResult
}

export class findName extends MachineDataOp {
    constructor(routePath: string) {
        super();
        this.routeDefinition = routePath
        this.queryObject = {
            where:{
                name:{
                    mode:'insensitive'
                }
            },
            select:{
                id:true,
                name:true
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

            req.validationResult = nameWithSearchMethodObject().validate(req.body)
            if (req.validationResult.error) {
                next(new JoiValidationError(req.validationResult.error.message, req.validationResult.error, 400))
            }

            next()
        }
    }

    queryPrep() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('query prep')

            this.queryObject.where.name[req.validationResult.value.searchMethod??"contains"] = req.validationResult.value.name

            next()
        }
    }
}