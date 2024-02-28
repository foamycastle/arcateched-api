import {Prisma, PrismaClient} from "@prisma/client"
import {extendedRequest, extendedResponse, PrismaModel, RouterWareFunctions} from "../PrismaModel";
import {NextFunction} from "express";

export abstract class DatabaseUtilityOp extends PrismaModel{

    constructor(model:Prisma.ModelName){
        super()
        this.prismaModel = this.prismaClient[model]
    }

    get stack():RouterWareFunctions[]{
        return[

        ]
    }

    queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void {
        return function (request: extendedRequest, response: extendedResponse, next: NextFunction) {

        };
    }


}