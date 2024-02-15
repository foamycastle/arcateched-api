import {Request, Response} from "express";
import postMachineData from "../CRUD/machine_data/post_Machine_Data";

export async function postMachineDataHandler(req:Request,res:Response){
    postMachineData(req.body)
        .then(result=> res.json(result))
        .catch(error=>res.status(500).json({error:error.message}))
}