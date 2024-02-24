import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import Prisma from "@prisma/client"
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

export default class updateAttachment extends MachineData {

    opName: string

    constructor() {
        super();
        this.opName = 'updateAttachment'
        this.prismaOp = 'update'
        this.validationMethod = inputValidation
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'queryPreparation')

            const validata = request.validationResult.value
            this.preparedQuery = preparedQuery(validata.id,validata.attachmentId,validata.data)
            request.touchTimestamp=false
            next()
        }
    }
}