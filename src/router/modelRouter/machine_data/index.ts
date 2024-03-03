import Express from "express";
const cors=require('cors')
import getMachineNames from "../../../PrismaModel/MachineData/getMachineNames";
import getMachinesById from "../../../PrismaModel/MachineData/getMachinesByID";
import getMachinesByOpState from "../../../PrismaModel/MachineData/getMachineByOpState";
import getMachinesByGameType from "../../../PrismaModel/MachineData/getMachinesByGameType";
import findSerialNumber from "../../../PrismaModel/MachineData/findSerialNumber";
import findModelNumber from "../../../PrismaModel/MachineData/findModelNumber";
import findDateOfMfg from "../../../PrismaModel/MachineData/findDateOfMfg";
import findName from "../../../PrismaModel/MachineData/findName";
import createComment from "../../../PrismaModel/MachineData/createComment";
import getAllComments from "../../../PrismaModel/MachineData/getAllComments";
import updateComment from "../../../PrismaModel/MachineData/updateComment";
import deleteComment from "../../../PrismaModel/MachineData/deleteComment";
import createAttachment from "../../../PrismaModel/MachineData/createAttachment";
import updateAttachment from "../../../PrismaModel/MachineData/updateAttachment";
import deleteAttachment from "../../../PrismaModel/MachineData/deleteAttachment";
import createMachineData from "../../../PrismaModel/MachineData/createMachineData";

const machine_dataRouter=Express.Router({
    strict:true,
    caseSensitive:true
})
machine_dataRouter.all('*',cors({
    origin:true,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}))
machine_dataRouter.get('/names',            (new getMachineNames).stack)
machine_dataRouter.get('/byId',             (new getMachinesById).stack)
machine_dataRouter.get('/opState',          (new getMachinesByOpState).stack)
machine_dataRouter.get('/byType',           (new getMachinesByGameType).stack)
machine_dataRouter.get('/findSerialNumber', (new findSerialNumber).stack)
machine_dataRouter.get('/findModelNumber',  (new findModelNumber).stack)
machine_dataRouter.get('/findDateOfMfg',    (new findDateOfMfg).stack)
machine_dataRouter.get('/findName',         (new findName).stack)
machine_dataRouter.get('/getAllComments',   (new getAllComments).stack)

machine_dataRouter.put('/createComment',    (new createComment).stack)
machine_dataRouter.put('/updateComment',    (new updateComment).stack)
machine_dataRouter.put('/deleteComment',    (new deleteComment).stack)
machine_dataRouter.put('/createAttachment', (new createAttachment).stack)
machine_dataRouter.put('/updateAttachment', (new updateAttachment).stack)
machine_dataRouter.put('/deleteAttachment', (new deleteAttachment).stack)

machine_dataRouter.post('/createMachineData',  (new createMachineData).stack)

export default machine_dataRouter;