import {Request,Response,NextFunction} from "express";
import Prisma from "@prisma/client";
import manyMachinesById from "../CRUD/machine_data/read_manyMachinesById";
import byOpState from "../CRUD/machine_data/read_byOpState";
import read_getContactType from "../CRUD/contacts/read_getContactType";
import read_names from "../CRUD/machine_data/read_names";
import read_machine from "../CRUD/machine_data/read_machine";
import touchTimestamp from "../CRUD/touchTimestamp";
import read_byGameType from "../CRUD/machine_data/read_byGameType";

/**
 * Retrieve a list of machines by the given identifiers
 */
export function manyMachinesByIdHandler(req:Request,res:Response){
    manyMachinesById(req.body)
        .then((result)=> {
            if(result.length==0){
                res
                    .status(404)
                    .json({
                        error:{
                            message:"No objects match the supplied data"
                        }
                    })
                return
            }
            res.json(result)
        })
        .catch((error)=>{
            res
                .status(500)
                .json({
                    error:{
                        message:error.message
                    }
                })
        })
}

/**
 * Retrieve a list of machines by their operational state
 */
export function machineByOpStateHandler(req:Request, res:Response){
    byOpState(<Prisma.opState>req.params.opState)
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

/**
 * Retrieve all read_machine read_names
 */
export function machineNamesHandler(req:Request,res:Response,next:NextFunction){
    read_names()
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

/**
 * Retrieve a single read_machine record by its ID
 */
export function machineByIdHandler(req:Request,res:Response,next:NextFunction){
    read_machine(req.params.id)
        .then((results)=>{
            touchTimestamp(results.timestampObject.id)
            res.json(results)
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
export function machineByGameTypeHandler(req:Request, res:Response){
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

/**
 * Retrieve A List of contacts whose type is the given type
 */
export function contactsByTypeHandler(req:Request,res:Response){
    read_getContactType(req.body)
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