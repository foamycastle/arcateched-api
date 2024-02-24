import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";

export default class getMachineNames extends MachineData {

    opName:string
    constructor() {
        super();
        this.opName='getMachineNames'
        this.operationType = 'read'
        this.preparedQuery=preparedQuery
    }

    inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'inputValidation')
            next()
        }
    }
}