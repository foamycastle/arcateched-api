import {MachineData} from "../index";
import {ExpressRouterWare, extendedRequest, extendedResponse, RouterWareFunctions} from "../../../PrismaModel";
import {NextFunction} from "express";
import Joi from "joi";
import {Prisma} from "@prisma/client";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";
import preparedQuery from "./preparedQuery";
import {NoResultsFound} from "../../../ArcatechedError/NoResultsFound";
import {ArcatechedErrorInterface} from "../../../ArcatechedError";

export default class getMachinesById extends MachineData implements ExpressRouterWare {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesById'
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
            /*
                Sample Input:
                [
                    "b9e70284-4589-4e8d-b538-28ceee32a836",
                    "b9e70284-4589-4e8d-b538-28ceee32a836"
                ]
             */

            request.validationResult =
                Joi.array().items(Joi.string().uuid({version:['uuidv1',"uuidv4"]})).validate(request.body)

            if (request.validationResult.error){
                throw new MalformedRequest(
                    "The request validation failed",
                    request.validationResult.error.details
                    )
            }
            next()

        }
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            preparedQuery.where.OR = request.validationResult.value.map((recordId:string)=>{return {id: recordId}})
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
                        throw new NoResultsFound("No machines were found with the ID(s) supplied")
                    }
                    response.processedResults=results
                    next()
                })
                .catch((hell)=>{
                    console.log(hell)
                })
        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'resultEmitter')
            response.json(response.processedResults)
        }
    }

    errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('errorHandler', err)
            response.status(err.httpCode).json(err)
        }
    }
}