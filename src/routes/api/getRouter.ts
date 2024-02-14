import {Request, Response, NextFunction} from "express";
import allGameNames from "./get/machine_data/allGameNames";
import gameByID from "./get/machine_data/gameByID";
import getContactType from "./get/contacts/getContactType";
import touchTimestamp from "./put/touchTimestamp";
import Prisma from "@prisma/client";
import validateType from "../../validation/get/validateContactType";
import validateUUID from "../../validation/get/validateUUID";
const express = require("express")
export const getRouter=express.Router()

/**
 * Retrieve all game names
 */
getRouter.get('/machine_data/names',async (req:Request,res:Response,next:NextFunction)=>{
    allGameNames()
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
    gameByID(req.params.id)
        .then((results)=>{
            touchTimestamp(results.timestamp_machine_data_timestampTotimestamp.id)
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