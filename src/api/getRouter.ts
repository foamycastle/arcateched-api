import validateType from "../validation/get/validateContactType";
import validateUUID from "../validation/get/validateUUID";
import validateOpState from "../validation/get/validateOpState";
import validateManyMachineById from "../validation/get/validateManyMachineById";
import validateContactsByManyTypes from "../validation/get/validateContactsByManyTypes";
import validateByGameType from "../validation/get/validateByGameType";
import * as RouterPaths from '../rsc/getRouterPaths'
import * as GetHandlers from './getHandlers'
const express = require("express")
export const getRouter=express.Router()

getRouter.param('id',validateUUID)
getRouter.param('opState',validateOpState)

getRouter.use(RouterPaths.manyMachinesByIdPath,validateManyMachineById)
getRouter.use(RouterPaths.machineByGameType,validateByGameType)
getRouter.use(RouterPaths.contactsByTypePath,validateType)

getRouter.get(RouterPaths.machineNamesPath,GetHandlers.machineNamesHandler)
getRouter.get(RouterPaths.machineByIdPath,GetHandlers.machineByIdHandler)
getRouter.get(RouterPaths.manyMachinesByIdPath,GetHandlers.manyMachinesByIdHandler)
getRouter.get(RouterPaths.machineByOpStatePath,GetHandlers.machineByOpStateHandler)
getRouter.get(RouterPaths.machineByGameType,GetHandlers.machineByGameTypeHandler)
getRouter.get(RouterPaths.contactsByTypePath,GetHandlers.contactsByTypeHandler)

console.log('getRouter')