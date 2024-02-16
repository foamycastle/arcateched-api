import {machine_data_router} from "./models/machine_data/machine_data_router"
import {NextFunction, Request, Response} from "express";
const express = require('express')
export const modelRouter = express.Router()

modelRouter.use('/',(req:Request, res:Response, next:NextFunction)=>{
    console.log(req.method, req.path)
    next()
})

modelRouter.use('/machine_data',machine_data_router)

console.log('model router')
