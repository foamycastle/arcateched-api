import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";
import {Prisma} from "@prisma/client";

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

            const validata=request.validationResult.value
            this.preparedQuery.where.id=validata.machineId
            if(validata.dateBegin) {
                this.preparedQuery.select.comments.where.AND.push({
                    timestampObject: {
                        createdAt: {
                            gte: validata.dateBegin
                        }
                    }
                })
            }
            if(validata.dateEnd) {
                this.preparedQuery.select.comments.where.AND.push({
                    timestampObject:{
                        createdAt:{
                            lte:validata.dateEnd
                        }
                    }
                })
            }
            if(validata.content){
                this.preparedQuery.select.comments.where.AND.push({
                    content:{
                        search:validata.content
                    }
                })
            }
            next()
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')
            response.queryResult=this.prismaModel.findFirstOrThrow(this.preparedQuery)
            next()
        }
    }

}