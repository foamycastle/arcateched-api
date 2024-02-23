import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../../PrismaModel";
import {NextFunction} from "express";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getMachinesById extends MachineData {

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

            request.validationResult = inputValidation.validate(request.body)

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

}