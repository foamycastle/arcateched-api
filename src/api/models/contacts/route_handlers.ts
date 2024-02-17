import {Request, Response} from "express";
import byType from "./crud/read/byType";
import byName from "./crud/read/byName";

export function contacts_byType_handler(req:Request, res:Response){
    byType(req.body)
        .then((results) => {
            if(results.length==0){
                res
                    .status(404)
                    .json({
                        error:{
                            message:`No contacts with the ${req.params.contactType} type`
                        }
                    })
                return
            }
            res.json(results)
        })
        .catch((error)=> {
            res
                .status(400)
                .json({
                    error: {
                        message: error.message
                    }
                })
            return
        })
}
export function contacts_byName_handler(req:Request, res:Response):void{
    byName(req.body.name)
        .then((results)=>{
            res.json(results)
        })
        .catch((error)=>{
            if(error instanceof Prisma.PrismaClientValidationError){
                res.status(400).json({
                    error:{
                        message:():string=>{
                            const lastLF=error.message.lastIndexOf("\n");
                            return error.message.substring(lastLF+2)
                        }
                    }
                })
            }
        })
}
            res.status(201).json(results)