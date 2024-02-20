import {prismaClientEventType, PrismaQueryOp} from "../../../PrismaQueryOp";
import {PrismaClient} from "@prisma/client";
import {ArcatechedAPIRuntimeError} from "../../../../errorObjects/ArcatechedAPIRuntimeError";
import e, {NextFunction, Request, Response} from "express";
import {NoResultsError} from "../../../../errorObjects/NoResultsError";
import {JoiValidationError} from "../errorObjects/JoiValidationError";

export abstract class MachineDataOp extends PrismaQueryOp{
    protected routeDefinition:string;
    //protected prismaClient:PrismaClient
    constructor() {

        const logOptions:prismaClientEventType={
            log:[
                {emit:"stdout",level:"query"},
                {emit:"stdout",level:"error"},
                {emit:"stdout",level:"info"},
                {emit:"stdout",level:"warn"},
            ]
        }
        super(new PrismaClient(logOptions),'machine_data')

        this.createValidationSchema=null
        this.updateValidationSchema=null
    }
    errorHandler() {
        return (err: typeof ArcatechedAPIRuntimeError, req: Request, res: Response, next: NextFunction) => {
            console.log('err')
            if (err instanceof NoResultsError || err instanceof JoiValidationError) {
                res.status(<number>err.code).json(err.responseObject())
            } else {
                console.log(err)
            }
            next()
        };
    }
    routeHandler() {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('route')
            if(res.headersSent){
                console.log('headers sent')
            }
            this.run()
                .then((results) => {
                    console.log('results',results)
                    if (results.length == 0) {
                        console.log('results 0')
                        next(new NoResultsError("Search returned zero results"))
                        return
                    }
                    this.touchTimestamp(results.map(result=>result.id))
                    res.status(200).json(results)
                    res.end()
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code === "P2025") {
                        next(new NoResultsError("Prisma Code P2025"))
                    }
                })
        }
    }

    protected resultsHandler(results: object) {
    }
    queryPrep(): (req: e.Request, res: e.Response, next: e.NextFunction) => void {
        return function (p1: e.Request, p2: e.Response, p3: e.NextFunction) {
        };
    }
    validationHandler(): (req: e.Request, res: e.Response, next: e.NextFunction) => void {
        return function (p1: e.Request, p2: e.Response, p3: e.NextFunction) {
        };
    }


}