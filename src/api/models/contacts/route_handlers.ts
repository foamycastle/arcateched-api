import {Request, Response} from "express";
import byType from "./crud/read/byType";
import byName from "./crud/read/byName";
import {Prisma} from "@prisma/client";
import byId from "./crud/read/byId";
import touchTimestamp from "../touchTimestamp";
import createContact from "./crud/create/createContact";
import updateContact from "./crud/update/updateContact";

export function contacts_byType_handler(req:Request, res:Response):void{
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
export function contacts_byId_handler(req:Request,res:Response):void{
    byId(req.params.id)
        .then((result)=>{
            touchTimestamp(result.id)
            res.json(result)
        })
        .catch((error)=>{
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code==="P2025"){
                    res.status(404).json({
                        error:{
                            message:`Could not find contact entry with ID '${req.params.id}'`
                        }
                    })
                }
            }else{
                res.status(500).json(error)
            }
        })
}
export function contacts_create_handler(req:Request,res:Response):void{
    createContact(req.body)
        .then((results)=>{
            res.status(201).json(results)
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
}
export function contacts_update_handler(req:Request,res:Response):void{
    updateContact(req.body)
        .then((results)=>{
            res.json(results)
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
}