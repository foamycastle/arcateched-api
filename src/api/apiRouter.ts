import {getRouter} from "./getRouter";
import {postRouter} from "./postRouter";
import {putRouter} from "./putRouter";
import {NextFunction, Request, Response} from "express";
const express = require('express')
export const apiRouter = express.Router()

apiRouter.use('/',(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.method, req.path, req.protocol)
    next()
})
apiRouter.use('/get',getRouter)
apiRouter.use('/post',postRouter)
apiRouter.use('/put',putRouter)
console.log('api router')
