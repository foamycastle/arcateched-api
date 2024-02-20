import {MachineDataOp} from "../MachineDataOp";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {UUID} from "../../../../../validation/schemas/UUID";
import {JoiValidationError} from "../../errorObjects/JoiValidationError";

interface extendRequest extends Request{
    queryData:any
    validationResult:Joi.ValidationResult
}
export class getMachineById extends MachineDataOp {
    constructor(routePath: string) {
        super();
        this.routeDefinition = routePath
        this.queryObject = {
            where:{
                OR:[]
            },
            select:{
                id:true,
                name:true,
                serialNumber:true,
                modelNumber:true,
                gameType:true,
                gameZone:true,
                playerCount:true,
                opState:true,
                occupied:true,
                dateOfMfg:true,
                dateEnter:true,
                dateExit:true,
                timestampObject:true,
                machine_zones:true,
                todo:true,
                issues:true,
                comments:true,
                contacts:true,
                attachments:true,
                cabinetKey:true,
                serviceKey:true
            }
        }
    }
    protected run(input?: object):Promise<any> {

        console.log('queryObject',this.queryObject)
        return this.prismaClient[this.model].findMany(this.queryObject)
    }

    validationHandler() {
        return (req: extendRequest, res: Response, next: NextFunction) => {
            console.log('validation')
            if(res.headersSent){
                console.log('headers sent')
            }
            req.validationResult = Joi.array().items(UUID)
                .min(1)
                .validate(req.body)

            if (req.validationResult.error) {
                console.log(req.validationResult.error)
                next(new JoiValidationError(req.validationResult.error.message, req.validationResult.error, 400))
            }

            next()
        }
    }
    /*routeHandler() {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('route')

            this.run()
                .then((results) => {
                    console.log('results')
                    res.json(results)
                    this.touchTimestamp(results.map(result=>result.id))

                })
                .catch((error) => {
                    if (error.code === "P2025") {
                        next(new NoResultsError("Prisma Code P2025"))

                    }
                    console.log(error)
                })
        }
    }*/

    queryPrep(){
        return (req: extendRequest, res: Response, next: NextFunction) =>{
            console.log('query prep')
            if(res.headersSent){
                console.log('headers sent')
            }
            const validData=req.validationResult.value
            if(validData.length==1){
                this.queryObject.where={id: {equals:validData[0]}}
                next()
                return
            }
            this.queryObject.where.OR=validData.map((recordId:string)=> ({id: {equals: recordId}}))
            next()
        }
    }
}