import Express, {NextFunction, Request, Response} from 'express'
import {modelRouter} from "./api/modelRouter";
import * as bodyParserOptions from "./bodyParserOptions";
import root_error_handler from "./root_error_handler";
const dotenv=require('dotenv').config()
export const express      = Express()
const morgan            = require('morgan')
const bodyParser        = require('body-parser')


//log request
express.use('/',(req:Request, res:Response, next:NextFunction)=>{
    console.log(req.method, req.path)
    next()
})
//use body parser
express.use(
    bodyParser.json(bodyParserOptions),
    root_error_handler
)

//model router
express.use('/models',modelRouter)
express.listen(3000,()=>{
    console.log("listening on 3000...")
})