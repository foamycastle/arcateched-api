import {Request, Response, NextFunction} from "express";
import validateUpdateMachine_Data from "../validation/put/validateUpdateMachine_Data";
import modifyMachine_Data from "../CRUD/machine_data/put_modifyMachine_Data";
import modifyManyMachine_Data from "../CRUD/machine_data/put_modifyManyMachine_Data";
import validateUpdateManyMachine_Data from "../validation/put/validateUpdateManyMachine_Data";
const express = require("express")
export const putRouter=express.Router()

putRouter.use(/\/game$/g,validateUpdateMachine_Data)
putRouter.put(/\/game$/g,async (req:Request, res:Response)=>{
    modifyMachine_Data(req.body)
        .then(result=>res.json(result))
        .catch(error=>res.status(500).json({error:{message:error.message}}))
})

putRouter.use(/\/game\/many/g,validateUpdateManyMachine_Data)
putRouter.put(/\/game\/many$/g,async (req:Request,res:Response)=>{
    modifyManyMachine_Data(req.body)
        .then(result=>res.json(result))
        .catch(error=>res.status(500).json({error:{message:error.message}}))

})

console.log('putRouter')