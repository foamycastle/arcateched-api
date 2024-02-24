import {MachineData} from "../index";
import {extendedRequest, extendedResponse } from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class findName extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'findName'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const nameSearch=request.validationResult.value.name
            const stringComparisonMethod=request.validationResult.value.searchMethod
            if(stringComparisonMethod){
                this.preparedQuery.where.name[stringComparisonMethod]=nameSearch
            }else{
                this.preparedQuery.where.name=nameSearch
            }
            request.touchTimestamp=true
            next()
        }
    }
}