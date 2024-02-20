import {machine_data_router} from "./models/machine_data/machine_data_router"
import {machine_data_root} from "./models/machine_data/route_definitions";
const express = require('express')
export const modelRouter = express.Router()


modelRouter.use(machine_data_root,machine_data_router)

/*modelRouter.use((req:Request,res:Response)=>{
    const noRoute=new NoRouteError("No route available for the given path",req.path)
    if (res.headersSent) return
    res.status(<number>noRoute.code).json(noRoute.responseObject())
})*/

console.log('model router')
