import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getAllComments extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getAllComments'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')

        }
    }

}