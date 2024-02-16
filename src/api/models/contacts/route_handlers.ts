import {Request, Response} from "express";
import read_getContactType from "../../../CRUD/contacts/read_getContactType";

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