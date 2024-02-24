import {MachineData} from "../index";
import {extendedRequest, extendedResponse} from "../../index";
import {NextFunction} from "express";
import preparedQuery from "./preparedQuery";
import inputValidation from "./validation";

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
            if(validata.dateBegin&&validata.dateEnd){
                if(this.preparedQuery.include.comments===true){
                    delete this.preparedQuery.include.comments
                    this.preparedQuery.include.comments={where: {AND: []}}
                }
                this.preparedQuery.include.comments.where.AND.push({
                    timestampObject:{
                        createdAt:{
                            gte:validata.dateBegin
                        }
                    }
                },
                {
                    timestampObject:{
                        createdAt:{
                            lte:validata.dateEnd
                        }
                    }
                })
            }
            if(validata.contents){
                if(this.preparedQuery.include.comments===true){
                    delete this.preparedQuery.include.comments
                    this.preparedQuery.include.comments={where: {AND: []}}
                }
                this.preparedQuery.include.comments.where.AND.push({
                    contents:{
                        search:validata.contents
                    }
                })
            }
        }
    }

    databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {
            console.log(this.opName, 'databaseOperation')

        }
    }

}