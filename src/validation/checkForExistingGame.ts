import {prismaClient} from "../prisma/prismaClient";
import {Prisma} from "@prisma/client";
import {NextFunction, Request, Response} from "express";

export default async function checkForExistingGame(req:Request,res:Response,next:NextFunction){

    const count= prismaClient.machine_data.count({
        where: {
            gameName: req.body.gameName,
            serialNumber: req.body.serialNumber
        }
    }).then((count)=>{
        if(count===0) {
        next()
        return;
    }

        res
            .status(400)
            .json({error:{message:"Game already exists with current serial number"}})
    })
        .catch(error=>res.status(500).json({error:{message:error.message}}))



}