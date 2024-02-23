import Express from "express";
import getMachineNames from "../../../PrismaModel/MachineData/getMachineNames";
import getMachinesById from "../../../PrismaModel/MachineData/getMachinesByID";

const machine_dataRouter=Express.Router({
    strict:true,
    caseSensitive:true
})

machine_dataRouter.get('/names',    (new getMachineNames).stack)
machine_dataRouter.get('/byId',     (new getMachinesById).stack)

export default machine_dataRouter;