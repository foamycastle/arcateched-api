import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class deleteComment extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'deleteComment'
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const validata=request.validationResult.value

            this.preparedQuery = preparedQuery(validata.id,validata.commentId)
            next()
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')
            response.queryResult=this.prismaModel.update(this.preparedQuery)
            next()
        }
    }

    /*resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultProcessor')
        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultEmitter')
        }
    }

    errorHandler(): (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'errorHandler')
        }
    }*/
}