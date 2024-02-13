import {Request, Response, NextFunction} from "express";
import allGameNames from "./get/allGameNames";
import gameByID from "./get/gameByID";
import allManufacturers from "./get/allManufacturers";
import touchTimestamp from "./put/touchTimestamp";
import {Prisma} from "@prisma/client";
const express = require("express")
export const getRouter=express.Router()

/**
 * Retrieve all game names
 */
getRouter.get('/allGameNames',async (req:Request,res:Response,next:NextFunction)=>{
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
getRouter.get("/id/:id",async (req:Request,res:Response,next:NextFunction)=>{
    //validate UUID
    const validUUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/ig.test(req.params.id)

    if(!validUUID){
        res
            .status(400)
            .json({
                error:{
                    message:"Malformed game identifier in request"
                }
            })
    }

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

getRouter.get("/allManufacturers",async (req:Request,res:Response)=>{
    allManufacturers()
        .then(results => res.json(results))
        .catch(error=>res.status(400).json({error:{message: error.message}}))
})
console.log('getRouter')