import {Prisma, PrismaClient} from "@prisma/client"
import {extendedRequest, extendedResponse, PrismaModel, RouterWareFunctions} from "../PrismaModel";
import {NextFunction} from "express";

export abstract class DatabaseUtilityOp extends PrismaModel{

    constructor(model:Prisma.ModelName){
        super()
        this.prismaModel = this.prismaClient[model]
        this.operationType = 'read'

    }

    get stack():RouterWareFunctions{
        return[
            this.queryPreparation()
        ]
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return (request: extendedRequest, response: extendedResponse, next: NextFunction) => {

        };
    }


}