import {Request, Response, NextFunction} from "express";
import allMachineNames from "./get/machine_data/allMachineNames";
import machineByID from "./get/machine_data/machineByID";
import getContactType from "./get/contacts/byType/getContactType";
import touchTimestamp from "./put/touchTimestamp";
import Prisma from "@prisma/client";
import validateType from "../validation/get/validateContactType";
import validateUUID from "../validation/get/validateUUID";
import validateOpState from "../validation/get/validateOpState";
import byOpState from "./get/machine_data/byOpState/byOpState";
import validateUpdateManyMachine_Data from "../validation/put/validateUpdateManyMachine_Data";
import manyMachinesById from "./get/machine_data/manyMachinesById";
const express = require("express")
export const getRouter=express.Router()

/**
 * Retrieve all game names
 */
getRouter.get('/machine_data/names',async (req:Request,res:Response,next:NextFunction)=>{
    allMachineNames()
        .then((results)=>{
            res.json(results)
        })
        .catch((error)=>{
            res
                .status(500)
                .json(error)
        })
})

/**
 * Retrieve a single game record by its ID
 */
getRouter.param('/machine_data/:id',validateUUID)
getRouter.get("/machine_data/:id",async (req:Request,res:Response,next:NextFunction)=>{
    machineByID(req.params.id)
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
            res.json(error)
        })
})
getRouter.use('/machine_data/manyMachinesById',validateUpdateManyMachine_Data)
getRouter.get('/machine_data/manyMachinesById',async (req:Request,res:Response)=>{
    manyMachinesById(req.body)
        .then(result=>res.json(result))
        .catch((error)=>{
            res.json({
                error:{
                    message:error.message
                }
            })
        })
})

getRouter.param('opState',validateOpState)
getRouter.get('/machine_data/byOpState/:opState',async (req:Request,res:Response)=>{
    byOpState(<Prisma.opState>req.params.opState)
        .then(results=>res.json(results))
        .catch(error=>console.log(error))
})
/**
 * Retrieve A
 */
getRouter.param('contactType',validateType)
getRouter.get("/contacts/byType/:contactType",async (req:Request,res:Response)=>{

    getContactType(<Prisma.contactType>req.params.contactType)
        .then(results => res.json(results))
        .catch(error=>res.status(400).json({error:{message: error.message}}))
})

console.log('getRouter')