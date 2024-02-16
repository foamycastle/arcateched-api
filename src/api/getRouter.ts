import validateManyMachineById from "../validation/get/validateManyMachineById";
import validateByGameType from "../validation/get/validateByGameType";
import * as RouterPaths from '../rsc/getRouterPaths'
import * as GetHandlers from './getHandlers'
const express = require("express")
export const getRouter=express.Router()




getRouter.use(RouterPaths.manyMachinesByIdPath,validateManyMachineById)
getRouter.use(RouterPaths.machineByGameType,validateByGameType)

getRouter.get(RouterPaths.contactsByTypePath,GetHandlers.contactsByTypeHandler)

console.log('getRouter')