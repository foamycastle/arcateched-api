import Express from "express";

const utilityRouter = Express.Router({
    strict:true,
    caseSensitive:true
})
export default utilityRouter;

utilityRouter.get('/createMachineEntry')