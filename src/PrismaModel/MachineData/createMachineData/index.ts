import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";

export default class createMachineData extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'createMachineData'
        this.prismaOp = 'create'
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

    inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'inputValidation')
            request.validationResult = this.validationMethod.validate(request.body)

            if(request.validationResult.error){
                next(new MalformedRequest("This request is not viable to create new machine", request.validationResult.error.details))
            }
            next()
        }
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')

            const validata = request.validationResult.value
            this.preparedQuery = preparedQuery(validata)

            next()
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')

            response.queryResult=this.prismaModel.create({
                ...this.preparedQuery
            })
            next()
        }
    }

    resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultProcessor')

            response.queryResult
                .then((result)=>{
                    response.processedResults=result
                    next()
                })
                .catch((err)=>{
                    next(err)
                })
        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultEmitter')
            response.status(201).json(response.processedResults)
            next()
        }
    }

    errorHandler(): (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: any, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'errorHandler', err)
            response.status(err.httpCode).json(err.responseObject.details)
            next()
        }
    }
}