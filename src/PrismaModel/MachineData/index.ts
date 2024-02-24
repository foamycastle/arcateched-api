import {extendedRequest, extendedResponse, PrismaModel, RouterWareFunctions} from "../index";
import {NextFunction} from "express";
import {NoResultsFound} from "../../ArcatechedError/NoResultsFound";
import {ArcatechedErrorInterface} from "../../ArcatechedError";
import {MalformedRequest} from "../../ArcatechedError/BadRequest/MalformedRequest";
import {Prisma} from "@prisma/client";


export abstract class MachineData extends PrismaModel{
    opName:string
    protected preparedQuery:any
    protected validationMethod:any
    constructor() {
        super()
        this.opName="Machine Data"
        this.prismaModel=this.prismaClient.machine_data
        this.operationType='read'
    }

    get stack(): RouterWareFunctions {
        return [
            this.inputValidation(),
            this.queryPreparation(),
            this.databaseOperation(),
            this.resultProcessor(),
            this.touchTimestamp(),
            this.resultEmitter(),
            this.errorHandler()
        ]
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
            request.touchTimestamp=true
            next()
        }
    }
    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('Machine Data', 'databaseOperation', this.prismaOp)
            response.queryResult=this.prismaModel[this.prismaOp](this.preparedQuery)
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
    touchTimestamp(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return  (request: extendedRequest, response: extendedResponse, next: NextFunction)=> {
            console.log('Machine Data', 'touchTimestamp')
            if(!request.touchTimestamp){
                next()
                return;
            }
            let transactionArray:Prisma.PrismaPromise<any>[] = []
            const results=response.processedResults
            if(!Array.isArray(response.processedResults)){
                let queryObject=this.getTouchObject(results.id,this.operationType)
                transactionArray.push(this.prismaModel.update(queryObject))
            }else {
                for (const recordId of response.processedResults) {
                    let queryObject = this.getTouchObject(recordId.id, this.operationType)
                    transactionArray.push(this.prismaModel.update(queryObject))
                }
            }
            this.prismaClient.$transaction(transactionArray)
                .then((results)=>{
                    console.log(`touched ${results.length} timestamp${results.length==1?'':'s'}`)
                    next()
                })
                .catch((hell)=>{
                    console.log(hell)
                    next()
                })
        };
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