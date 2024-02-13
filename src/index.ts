import Express from 'express'
import {apiRouter} from "./routes/apiRouter";
export const express      = Express()

const bodyParser        = require('body-parser')
const bodyParserOptions = {
    type:'application/json'
}

//Middleware
express.use(
    bodyParser.json(bodyParserOptions),
)

express.use('/api',apiRouter)

express.listen(3000,()=>{
    console.log("listening on 3000...")
})