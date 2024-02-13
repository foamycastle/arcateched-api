import {Request, Response, NextFunction} from "express";
import createNewGame from "./post/createMachine_Data";
import validateCreateMachine_Data from "../../validation/post/validateCreateMachine_Data";
import checkForExistingGame from "../../validation/checkForExistingGame";
const express = require("express")
export const postRouter=express.Router()

postRouter.use('/createNewGame',validateCreateMachine_Data)
postRouter.use('/createNewGame',checkForExistingGame)

postRouter.post('/createNewGame',async (req:Request,res:Response)=>{
    createNewGame(req.body)
        .then(result=> res.json(result))
        .catch(error=>res.status(400).json({error:error.message}))
})

console.log('postRouter')