import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";
export default class findSerialNumber extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'findSerialNumber'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            const serialNumberSearch=request.validationResult.value.serialNumber
            const stringComparisonMethod=request.validationResult.value.searchMethod
            if(stringComparisonMethod){
                this.preparedQuery.where.serialNumber[stringComparisonMethod]=serialNumberSearch
            }else{
                this.preparedQuery.where.serialNumber=serialNumberSearch
            }
            request.touchTimestamp=true
            next()
        }
    }


}