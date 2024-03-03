import Express from "express";
import {Helper} from "./helper/helper";
import router from "./router";

const server = Express()
const config=require('dotenv').config()
server.use(Express.json({
    type:'application/json',
    limit: 1024,
    verify:Helper.verifyJSON
}))



server.use("/",(req,res,next)=>{
    console.log("Request: ",req.method, req.path)
    next()
})
server.use(router)
const serverPort=config.PORT ?? 3000

server.listen(3000,()=>{console.log(`Server listening on port 3000!`)})





