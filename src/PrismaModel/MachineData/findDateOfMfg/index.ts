import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class findDateOfMfg extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'findDateOfMfg'
        this.operationType = 'read'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const dateValue=request.validationResult.value.dateOfMfg
            const searchMethod=request.validationResult.value.searchMethod
            if(!searchMethod){
                this.preparedQuery.where.dateOfMfg=dateValue
            }else{
                this.preparedQuery.where.dateOfMfg[searchMethod]=dateValue
            }
            next()
        }
    }

}