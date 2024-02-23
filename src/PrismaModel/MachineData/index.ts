import {extendedRequest, extendedResponse, PrismaModel} from "../index";
import {Prisma} from "@prisma/client";
import {NextFunction} from "express";
import {NoResultsFound} from "../../ArcatechedError/NoResultsFound";
import {ArcatechedErrorInterface} from "../../ArcatechedError";


export abstract class MachineData extends PrismaModel{
    opName:string
    preparedQuery:any
    constructor() {
        super()
        this.prismaModel=this.prismaClient.machine_data

    }

    inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'inputValidation')
            next()
        }
    }
    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'queryPreparation')
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
            console.log(this.opName,'resultEmitter')
            response.json(response.processedResults)
        }
    }
    errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log('errorHandler', err)
            response.status(500).json(err)
        }
    }

}