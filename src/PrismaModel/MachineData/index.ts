import {extendedRequest, extendedResponse, PrismaModel} from "../index";
import {NextFunction} from "express";
import {NoResultsFound} from "../../ArcatechedError/NoResultsFound";
import {ArcatechedErrorInterface} from "../../ArcatechedError";
import {MalformedRequest} from "../../ArcatechedError/BadRequest/MalformedRequest";


export abstract class MachineData extends PrismaModel{
    opName:string
    protected preparedQuery:any
    protected validationMethod:any
    constructor() {
        super()
        this.opName="Machine Data"
        this.prismaModel=this.prismaClient.machine_data

    }

    inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data', 'inputValidation')
            request.validationResult = this.validationMethod.validate(request.body)

            if (request.validationResult.error) {
                throw new MalformedRequest("The request has invalid input in the request body", request.validationResult.error.details)
            }
            next()
        }
    }
    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data','queryPreparation')
            next()
        }
    }
    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data', 'databaseOperation', 'findMany')
            response.queryResult=this.prismaModel.findMany(this.preparedQuery)
            next()
        }
    }
    resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data', 'resultProcessor')

            response.queryResult
                .then((results)=>{
                    if(results.length===0){
                        next(new NoResultsFound("No results were returned in the search"))
                        return
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
            console.log('Machine Data','resultEmitter')
            response.json(response.processedResults)
        }
    }
    errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data','errorHandler', err)
            response.status(500).json(err)
            next()
        }
    }

}