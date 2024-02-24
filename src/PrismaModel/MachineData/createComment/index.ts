import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class createComment extends MachineData {

    opName: string
    constructor() {
        super();
        this.opName = 'createComment'
        this.operationType = 'update'
        this.prismaOp = 'update'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')

            const validata=request.validationResult.value
            this.preparedQuery.where.id=validata.id
            this.preparedQuery.data.comments.create.content = validata.content

            request.touchTimestamp=false
            next()
        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultEmitter')
            response.json(response.processedResults)
            next()
        }
    }
}