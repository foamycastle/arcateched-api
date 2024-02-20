import * as RouteDef from './route_definitions'
import {getAllMachineNames} from "./crud/read/getAllMachineNames";
import {getMachineById} from "./crud/read/getMachineById";
import {getMachineByType} from "./crud/read/getMachineByType";
import {getMachineByOpState} from "./crud/read/getMachineByOpState";
import { findSerialNumber } from './crud/read/findSerialNumber';
import {findName} from "./crud/read/findName";
import {findModelNumber} from "./crud/read/findModelNumber";
import {findDateOfMfg} from "./crud/read/findDateOfMfg";
const express = require('express')
export const machine_data_router = express.Router()

const getAll= new getAllMachineNames(RouteDef.names)
machine_data_router.get(RouteDef.names,[
    getAll.routeHandler(),
    getAll.errorHandler()
])

const ById = new getMachineById(RouteDef.byId)
machine_data_router.get(RouteDef.byId,[
    ById.validationHandler(),
    ById.queryPrep(),
    ById.routeHandler(),
    ById.errorHandler()
])

const ByType = new getMachineByType(RouteDef.byGameType)
machine_data_router.get(RouteDef.byGameType,[
    ByType.validationHandler(),
    ByType.queryPrep(),
    ByType.routeHandler(),
    ByType.errorHandler()
])

const ByOpState = new getMachineByOpState(RouteDef.opState)
machine_data_router.get(RouteDef.opState,[
    ByOpState.validationHandler(),
    ByOpState.queryPrep(),
    ByOpState.routeHandler(),
    ByOpState.errorHandler()
])

const serialNumber = new findSerialNumber(RouteDef.findSerialNumber)
machine_data_router.get(RouteDef.findSerialNumber,[
    serialNumber.validationHandler(),
    serialNumber.queryPrep(),
    serialNumber.routeHandler(),
    serialNumber.errorHandler()
])

const name = new findName(RouteDef.findName)
machine_data_router.get(RouteDef.findName,[
    name.validationHandler(),
    name.queryPrep(),
    name.routeHandler(),
    name.errorHandler()
])

const modelNumber = new findModelNumber(RouteDef.findModelNumber)
machine_data_router.get(RouteDef.findModelNumber,[
    modelNumber.validationHandler(),
    modelNumber.queryPrep(),
    modelNumber.routeHandler(),
    modelNumber.errorHandler()
])

const dateOfMfg = new findDateOfMfg(RouteDef.findDateOfMfg)
machine_data_router.get(RouteDef.findDateOfMfg,[
    dateOfMfg.validationHandler(),
    dateOfMfg.queryPrep(),
    dateOfMfg.routeHandler(),
    dateOfMfg.errorHandler()
])

