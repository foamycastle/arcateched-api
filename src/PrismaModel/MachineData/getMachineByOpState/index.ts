import {MachineData} from "../index";
import {
    extendedRequest,
    extendedResponse,
    RouterWareFunctions
} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";
import {NoResultsFound} from "../../../ArcatechedError/NoResultsFound";

export default class getMachinesByOpState extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesByOpState'
        this.preparedQuery=preparedQuery
        this.validationMethod=inputValidation
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

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            this.preparedQuery.where.OR = request.validationResult.value.map((value)=>{return {opState:value}})
            next()
        }
    }




}