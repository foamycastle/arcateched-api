import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class findModelNumber extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'findModelNumber'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const modelNumberSearch=request.validationResult.value.modelNumber
            const stringComparisonMethod=request.validationResult.value.searchMethod
            if(stringComparisonMethod){
                this.preparedQuery.where.modelNumber[stringComparisonMethod]=modelNumberSearch
            }else{
                this.preparedQuery.where.modelNumber=modelNumberSearch
            }
            request.touchTimestamp=true
            next()
        }
    }
    
}