import * as RouteHandler from './route_handlers'
import * as RouteDef from './route_definitions'
import * as Validation from './validation_handlers'

const express = require('express')
export const machine_data_router = express.Router()

machine_data_router.param('opState',Validation.validateOpState)

machine_data_router.use(RouteDef.machine_data_byId, Validation.machine_id_array)
machine_data_router.use(RouteDef.machine_data_byGameType,Validation.validateGameType)
machine_data_router.use(RouteDef.machine_data_create,Validation.validateCreateMachine_Data)

machine_data_router.get(RouteDef.machine_data_names, RouteHandler.machine_data_names_handler)
machine_data_router.get(RouteDef.machine_data_byId, RouteHandler.machine_data_byId_handler)
machine_data_router.get(RouteDef.machine_data_opState, RouteHandler.machine_data_byOpState_handler)
machine_data_router.get(RouteDef.machine_data_byGameType,RouteHandler.machine_data_byGameType_handler)

machine_data_router.post(RouteDef.machine_data_create,RouteHandler.machine_data_createMachine)
machine_data_router.put(RouteDef.machine_data_update,RouteHandler.machine_data_updateMachine)

