import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getUIFields extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getUIFields'
        this.prismaOp = 'findMany'
        this.validationMethod = inputValidation
    }

    get stack(): RouterWareFunctions {
        return [
            this.queryPreparation(),
            this.resultEmitter(),
            this.errorHandler()
        ]
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')

        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultEmitter')

            next()
        }
    }

    errorHandler(): (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'errorHandler')

            next()
        }
    }
}