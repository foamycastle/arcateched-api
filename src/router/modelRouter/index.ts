import Express from "express";
import machine_dataRouter from "./machine_data";

const modelRouter = Express.Router({
    strict:true,
    caseSensitive:true
})

modelRouter.use('/machine_data',machine_dataRouter)
export default modelRouter;