import Express from "express";
import getMachineNames from "../../../PrismaModel/MachineData/getMachineNames";
import getMachinesById from "../../../PrismaModel/MachineData/getMachinesByID";
import getMachinesByOpState from "../../../PrismaModel/MachineData/getMachineByOpState";
import getMachinesByGameType from "../../../PrismaModel/MachineData/getMachinesByGameType";

const machine_dataRouter=Express.Router({
    strict:true,
    caseSensitive:true
})

machine_dataRouter.get('/names',    (new getMachineNames).stack)
machine_dataRouter.get('/byId',     (new getMachinesById).stack)
machine_dataRouter.get('/opState',  (new getMachinesByOpState).stack)
machine_dataRouter.get('/byType',   (new getMachinesByGameType).stack)

export default machine_dataRouter;