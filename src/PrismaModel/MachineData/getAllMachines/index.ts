import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getAllMachines extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getAllMachines'
        this.prismaOp = 'findMany'
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')

            const validata = request.validationResult.value
            this.preparedQuery = preparedQuery()

            next()
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')

            next()
        }
    }

    resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultProcessor')

            next()
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