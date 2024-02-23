import {MachineData} from "../index";
import {excludedMethods, ExpressRouterWare, extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import {NoResultsFound} from "../../../ArcatechedError/NoResultsFound";
import {ArcatechedErrorInterface} from "../../../ArcatechedError";
import preparedQuery from "./preparedQuery";

export default class getMachineNames extends MachineData implements ExpressRouterWare {

    opName:string
    constructor() {
        super();
        this.opName='getMachineNames'
    }

    get stack():RouterWareFunctions {

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

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'databaseOperation')
            response.queryResult=this.prismaModel.findMany(preparedQuery)
            next()
        }
    }

    resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'resultProcessor')

            response.queryResult
                .then((results)=>{
                    response.processedResults=results
                    next()
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    }

    resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'resultEmitter')

            if(response.processedResults.length===0){
                throw new NoResultsFound("No results found with this operation")
            }

            response.json(response.processedResults)
        }
    }

    errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName,'errorHandler')
            response.status(err.httpCode).json(err.responseObject)
        }
    }
}