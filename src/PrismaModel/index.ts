import {Prisma, PrismaClient} from "@prisma/client";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {ArcatechedErrorInterface} from "../ArcatechedError";


export interface extendedRequest extends Request {
    validationResult:Joi.ValidationResult
    transactionArray:Prisma.PrismaPromise<any>[]
    preparedQuery:any
}
export interface extendedResponse extends Response {
    queryResult:Prisma.PrismaPromise<any>
    processedResults:any
}

export type PrismaTimestampTouch = {
    timestampObject:{
        where:{
            id:string
        },
        update:Prisma.timestampUpdateInput,
        create:Prisma.timestampCreateInput
    }
}

export type excludedMethods=
    "inputValidation" |
    "queryPreparation" |
    "databaseOperation" |
    "resultProcessor" |
    "resultEmitter" |
    "errorHandler"

export type RouterWareFunctions =Array<
    { (request: extendedRequest, response: extendedResponse, next: NextFunction) : void }|
    { (err:any,request: extendedRequest, response: extendedResponse, next: NextFunction) : void }
    >

export interface ExpressRouterWare{
    inputValidation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    queryPreparation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    databaseOperation():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    resultProcessor():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    resultEmitter():(request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
    errorHandler():(err:any,request: extendedRequest, response: extendedResponse, next: NextFunction)=>void;
}

export abstract class PrismaModel implements ExpressRouterWare{

    protected prismaClient:PrismaClient
    protected prismaModel:any

    constructor(){
        this.prismaClient = new PrismaClient()
    }

    abstract inputValidation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract queryPreparation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract databaseOperation(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract resultProcessor(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract resultEmitter(): (request: extendedRequest, response: extendedResponse, next: NextFunction) => void
    abstract errorHandler(): (err: ArcatechedErrorInterface, request: extendedRequest, response: extendedResponse, next: NextFunction) => void

    touchTimestamp(idList:string[], operation:'create'|'delete'|'update'|'read'):void{
        let promiseStack:Prisma.PrismaPromise<any>[]=[]
        for(const id of idList){
            try {
                let queryObject:PrismaTimestampTouch={
                    timestampObject:{
                        where:{
                            id:id
                        },
                        create:{
                            createdAt:new Date()
                        },
                        update:{}
                    }
                }
                if (operation!=='read') {
                    queryObject.timestampObject.update={
                        modifiedAt:new Date()
                    }
                }else{
                    queryObject.timestampObject.update={
                        lastAccess:new Date()
                    }
                }
            }catch (e){
                console.log(e)
            }
        }
        this.prismaClient.$transaction(promiseStack).then((results)=>{
            console.log(`${(results.length??0)} ${(results.length==1?'timestamp':'timestamps')} touched`)
        })
    }

}