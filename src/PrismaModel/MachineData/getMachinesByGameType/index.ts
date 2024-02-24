import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import inputValidation from "./validation";
import preparedQuery from "./preparedQuery";
export default class getMachinesByGameType extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'getMachinesByGameType'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery = preparedQuery
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')
            this.preparedQuery.where.gameType.hasSome=request.validationResult.value
            request.touchTimestamp=true
            next()
        }
    }
}