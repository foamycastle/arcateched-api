import {MachineData} from "../index";
import {
    extendedRequest,
    extendedResponse
} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class getMachinesByOpState extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesByOpState'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery=preparedQuery
        this.validationMethod=inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            this.preparedQuery.where.OR = request.validationResult.value.map((value)=>{return {opState:value}})
            request.touchTimestamp=true
            next()
        }
    }




}