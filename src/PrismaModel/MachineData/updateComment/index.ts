import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class updateComment extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'updateComment'
        this.prismaOp = 'update'
        this.validationMethod = inputValidation
    }
    get stack(): RouterWareFunctions {
        return [
            this.inputValidation(),
            this.queryPreparation(),
            this.databaseOperation(),
            this.resultProcessor(),
            this.resultEmitter(),
            this.errorHandler()
        ]
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const validata=request.validationResult.value

            this.preparedQuery=preparedQuery(validata.id,validata.commentId,validata.content)
            request.touchTimestamp=false
            next()
        }
    }
}