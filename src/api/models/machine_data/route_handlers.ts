import {Request, Response} from "express";
import {$Enums} from "@prisma/client";
import {prismaClient} from "../../../prisma/prismaClient";
import names from "./crud/read/names";
import byId from "./crud/read/byId";
import touchTimestamp from "../touchTimestamp";
import byOpState from "./crud/read/byOpstate";
import read_byGameType from "./crud/read/byGameType";
import {machine_data_create} from "./route_definitions";
import createMachine from "./crud/create/createMachine";
import updateMachine from "./crud/update/updateMachine";

export function machine_data_names_handler(req:Request, res:Response):void {
    names()
        .then((results)=>{
            if(results.length==0){
                res
                    .status(404)
                    .json({
                        error:{
                            message:"No machines"
                        }
                    })
                return
            }
            res.json(results)
        })
        .catch((error)=>{
            res
                .status(500)
                .json({
                    error:{
                        message:error.message
                    }
                })
            return
        })
}
export function machine_data_byId_handler(req:Request, res:Response):void{
    byId(req.body)
        .then((results)=>{
            let transactionArray:any = []
            for(const result of results){
                transactionArray.push(touchTimestamp(result.timestamp))
                delete result.timestampObject.id
                delete result.timestamp
            }
            prismaClient.$transaction(transactionArray)
            res.json(results)
            return
        })
        .catch((error)=>{
            if(error.code){
                switch (error.code){
                    case 'P2025':
                        res.status(404)
                        break;
                    default:
                        res.status(500)
                        break;
                }
            }
            res.json({
                error:{
                    message:error.message
                }
            })
        })
}
export function machine_data_byOpState_handler(req:Request, res:Response):void{
    byOpState(<$Enums.opState>req.params.opState)
        .then((results)=> {
            if(results.length==0){
                res
                    .status(404)
                    .json({
                        error:{
                            message:`No machines with the ${req.params.opState} opState`
                        }
                    })
                return
            }
            res.json(results)
        })
        .catch((error)=>{
            res
                .status(500)
                .json({
                    error:{
                        message:error.message
                    }
                })
            return
        })
}
export function machine_data_byGameType_handler(req:Request, res:Response):void{
    read_byGameType(req.body)
        .then((results)=>{
            if(results.length==0){
                res
                    .status(404)
                    .json({
                        error:{
                            message:"Found 0 machines marked with all of the specified types"
                        }
                    })
                return
            }
            res.json(results)
        })
        .catch((error)=> {
            console.log(error)
            res.status(500).json(error)
        })
}
export function machine_data_createMachine(req:Request, res:Response):void{
    createMachine(req.body)
        .then((results)=>{
            res.json(results)
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
}
export function machine_data_updateMachine(req:Request,res:Response):void{
    updateMachine(req.body)
        .then((results)=>{
            res.json(results)
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
}
