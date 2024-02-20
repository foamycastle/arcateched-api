import {MachineDataOp} from "../MachineDataOp";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {JoiValidationError} from "../../errorObjects/JoiValidationError";
import {gameType} from "../../validation/gameType";

interface extendRequest extends Request {
    validationResult: Joi.ValidationResult
}

export class getMachineByType extends MachineDataOp {
    constructor(routePath: string) {
        super();
        this.routeDefinition = routePath
        this.queryObject = {
            where:{
                gameType:{
                    hasSome:[]
                }
            },
            select:{
                id:true,
                name:true,
                gameType:true
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

            req.validationResult = gameType().validate(req.body)
            if (req.validationResult.error) {
                next(new JoiValidationError(req.validationResult.error.message, req.validationResult.error, 400))
            }
            next()
        }
    }

    queryPrep() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('query prep')

            const validData = req.validationResult
            this.queryObject.where.gameType.hasSome=validData.value
            next()
        }
    }
}