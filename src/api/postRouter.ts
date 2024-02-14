import {Request, Response, NextFunction} from "express";
import createNewGame from "./post/machine_data/createMachine_Data";
import validateCreateMachine_Data from "../validation/post/validateCreateMachine_Data";
const express = require("express")
export const postRouter=express.Router()

postRouter.use('/createNewGame',validateCreateMachine_Data)

postRouter.post('/createNewGame',async (req:Request,res:Response)=>{
    createNewGame(req.body)
        .then(result=> res.json(result))
        .catch(error=>res.status(400).json({error:error.message}))
})

console.log('postRouter')