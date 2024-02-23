import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";

export default class getMachineNames extends MachineData {

    opName:string
    constructor() {
        super();
        this.opName='getMachineNames'
        this.preparedQuery=preparedQuery
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
            console.log(this.opName, 'inputValidation')
            next()
        }
    }
}