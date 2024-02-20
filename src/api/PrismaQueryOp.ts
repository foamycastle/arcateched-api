import {Prisma, PrismaClient} from "@prisma/client";
import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import {ArcatechedAPIRuntimeError} from "../errorObjects/ArcatechedAPIRuntimeError";

export interface queryOpContract {
    routeHandler(): (req: Request, res: Response, next: NextFunction) => void

    validationHandler(): (req: Request, res: Response, next: NextFunction) => void

    queryPrep(): (req: Request, res: Response, next: NextFunction) => void

    errorHandler(): (err: typeof ArcatechedAPIRuntimeError, req: Request, res: Response, next: NextFunction) => void
}

export type prismaClientEvents = 'query' | 'info' | 'warn' | 'error'
export type prismaClientEmitter = 'stdout' | 'event'
export type prismaClientEventType = {
    log: { level: prismaClientEvents, emit: prismaClientEmitter }[]
}

export abstract class PrismaQueryOp implements queryOpContract {

    protected queryObject: any;
    protected prismaClient: PrismaClient;
    protected model: string

    protected abstract run(input?: object): Promise<any>

    abstract routeHandler(): (req: Request, res: Response, next: NextFunction) => void

    abstract validationHandler(): (req: Request, res: Response, next: NextFunction) => void

    abstract errorHandler(): (err: typeof ArcatechedAPIRuntimeError, req: Request, res: Response, next: NextFunction) => void

    abstract queryPrep(): (req: Request, res: Response, next: NextFunction) => void

    protected abstract resultsHandler(results: object): void

    protected createValidationSchema: Joi.ObjectSchema | Joi.ArraySchema | null
    protected updateValidationSchema: Joi.ObjectSchema | Joi.ArraySchema | null

    constructor(prismaClient: PrismaClient, model: string) {
        this.prismaClient = prismaClient
        this.model = model
    }

    protected touchTimestamp(idArray: string[]) {
        let transactionArray: Prisma.PrismaPromise<any>[] = []
        idArray.forEach((id: string) => {
            transactionArray.push(
                this.prismaClient[this.model].update({
                    where: {
                        id: id
                    },
                    select: {id: true},
                    data: {
                        timestampObject: {
                            upsert: {
                                update: {
                                    lastAccess: new Date()
                                },
                                create: {
                                    createdAt: new Date()
                                }
                            }
                        }
                    }
                })
            )
        })
        this.prismaClient.$transaction(transactionArray)
            .then((results) => {
                console.log(`${results.length} ${results.length>1?'Timestamps':'Timestamp'} touched`)
            })
    }


}
