import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import inputValidation from "./validation";
import preparedQuery from "./preparedQuery";
export default class getMachinesByGameType extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesByGameType'
        this.preparedQuery = preparedQuery
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

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            this.preparedQuery.where.gameType.hasSome=request.validationResult.value
            next()
        }
    }
}