import {Prisma, PrismaClient} from "@prisma/client";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {ArcatechedErrorInterface} from "../ArcatechedError";

export interface extendedRequest extends Request {
    validationResult:Joi.ValidationResult
    transactionArray:Prisma.PrismaPromise<any>[]
    preparedQuery:any
    touchTimestamp:boolean
}
export interface extendedResponse extends Response {
    queryResult:Prisma.PrismaPromise<any>
    processedResults:any
}

export type OperationType='create'|'read'|'update'|'delete'
export type PrismaAPIQueryOp='findMany'|'findFirst'|'findFirstOrThrow'|'findUnique'|
    'findUniqueOrThrow'|'create'|'update'|'delete'|'upsert'|'createMany'|'updateMany'|'deleteMany'|'count'|
    'aggregate'|'groupBy'

export type RouterWareFunctions =Array<
    { (request: extendedRequest, response: extendedResponse, next: NextFunction) : void }|
    { (err:any,request: extendedRequest, response: extendedResponse, next: NextFunction) : void }
    >

export interface ExpressRouterWare{
    inputValidation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    queryPreparation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    databaseOperation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    resultProcessor():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    touchTimestamp():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    resultEmitter():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    errorHandler():(err:any,request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
}

export abstract class PrismaModel implements ExpressRouterWare{

    protected prismaClient:PrismaClient
    protected prismaModel:any
    protected prismaOp:PrismaAPIQueryOp
    protected operationType:OperationType

    constructor(){
        this.prismaClient = new PrismaClient()
    }

    abstract inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract touchTimestamp(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void

    protected getTouchObject(id:string,op:OperationType):typeof this.prismaModel.update{
        const returnThis={
            where:{id:id},
            data:{
                timestampObject:{
                    create:{
                        createdAt:new Date()
                    },
                    update:null
                }
            }
        }

        returnThis.data.timestampObject.update = op==='read'
            ? {lastAccess: new Date()}
            : {modifiedAt: new Date()}

        return returnThis

    }

}