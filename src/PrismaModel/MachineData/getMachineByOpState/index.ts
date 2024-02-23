import {MachineData} from "../index";
import {
    ExpressRouterWare,
    extendedRequest,
    extendedResponse,
    RouterWareFunctions
} from "../../../PrismaModel";
import {NextFunction} from "express";
import Joi from "joi";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";
import {NoResultsFound} from "../../../ArcatechedError/NoResultsFound";

export default class getMachinesByOpState extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesByOpState'
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
            request.validationResult=inputValidation.validate(request.body)

            if(request.validationResult.error){
                throw new MalformedRequest("The body of request was not valid",request.validationResult.error.details)
            }
            next()
        }
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            this.preparedQuery.where.OR = request.validationResult.value.map((value)=>{return {opState:value}})
            next()
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')
            response.queryResult=this.prismaModel.findMany(preparedQuery)
            next()
        }
    }

    resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultProcessor')
            response.queryResult
                .then((results)=>{
                    if(results.length===0){
                        throw new NoResultsFound("No results found")
                    }
                })
        }
    }

}