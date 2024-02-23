import {Prisma, PrismaClient} from "@prisma/client";
import {DefaultArgs, ExtensionArgs, InternalArgs} from "@prisma/client/runtime/library";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";


export interface extendedRequest extends Request {
    validationResult:Joi.ValidationResult
    transactionArray:Prisma.PrismaPromise<any>[]
    preparedQueryObject:any
}
export interface extendedResponse extends Response {
    queryResult:Prisma.PrismaPromise<any>
    processedResults:any
}

export type PrismaModelTypes =
    Prisma.attachmentsDelegate<DefaultArgs> |
    Prisma.commentsDelegate<DefaultArgs> |
    Prisma.contactsDelegate<DefaultArgs> |
    Prisma.contacts_addressesDelegate<DefaultArgs> |
    Prisma.contacts_internetDelegate<DefaultArgs> |
    Prisma.contacts_phoneDelegate<DefaultArgs> |
    Prisma.issuesDelegate<DefaultArgs> |
    Prisma.issues_problem_tagsDelegate<DefaultArgs> |
    Prisma.keysDelegate<DefaultArgs> |
    Prisma.machine_dataDelegate<DefaultArgs> |
    Prisma.machine_zonesDelegate<DefaultArgs> |
    Prisma.todoDelegate<DefaultArgs> |
    Prisma.timestampDelegate<DefaultArgs> |
    Prisma.usersDelegate<DefaultArgs>

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

export abstract class PrismaModel {

    protected prismaClient:PrismaClient
    protected prismaModel:any

    constructor(){
        this.prismaClient = new PrismaClient()
    }

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