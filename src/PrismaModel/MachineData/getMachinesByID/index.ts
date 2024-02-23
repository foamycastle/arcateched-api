import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import {MalformedRequest} from "../../../ArcatechedError/BadRequest/MalformedRequest";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getMachinesById extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesById'
        this.preparedQuery=preparedQuery;
        this.validationMethod=inputValidation;
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
            this.preparedQuery.where.OR = request.validationResult.value.map((recordId:string)=>{return {id: recordId}})
            next()
        }
    }


}