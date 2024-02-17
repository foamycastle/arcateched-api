import Express, {NextFunction, Request, Response} from 'express'
import {modelRouter} from "./api/modelRouter";
export const express      = Express()

const bodyParser        = require('body-parser')
const bodyParserOptions = {
    type:'application/json'
}

//Middleware
express.use(
    bodyParser.json(bodyParserOptions),
)

express.use('/models',modelRouter)
express.use('/',(req:Request, res:Response, next:NextFunction)=>{
    console.log(req.method, req.path)
    next()
})
express.listen(3000,()=>{
    console.log("listening on 3000...")
})