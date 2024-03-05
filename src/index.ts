import Express from "express";
import {Helper} from "./helper/helper";
import router from "./router";

const server = Express()
const config=require('dotenv').config()

server.use(require('cookie-parser')())
server.use(require('body-parser').urlencoded({ extended: false }))
server.use(Express.json({
    type:'application/json',
    limit: 1024,
    verify:Helper.verifyJSON
}))
server.use(expressSession({
        cookie:{
            maxAge: 8*60*60*1000,
        },
        secret:process.env.COOKIE_SECRET,
        resave:true,
        saveUninitialized:true,
        store: new PrismaSessionStore(
            //@ts-ignore
            new PrismaClient(),
            {
                checkPeriod:2*60*1000,
                sessionModelName:'session',
            }
        )
    }))
server.use(passport.initialize())
server.use(passport.session())
server.use(logger(process.env.ENV))
server.use(router)

const serverPort=config.PORT ?? 3000

server.listen(3000,()=>{console.log(`Server listening on port 3000!`)})





