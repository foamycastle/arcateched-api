import {MachineData} from "../index";
import {extendedRequest, extendedResponse, RouterWareFunctions} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";

export default class getMachineNames extends MachineData {

    opName:string
    constructor() {
        super();
        this.opName='getMachineNames'
        this.operationType = 'read'
        this.prismaOp = 'findMany'
        this.preparedQuery=preparedQuery
    }

    get stack(): RouterWareFunctions {
        return [
            this.queryPreparation(),
            this.databaseOperation(),
            this.resultProcessor(),
            this.touchTimestamp(),
            this.resultEmitter(),
            this.errorHandler()
        ]
    }
}