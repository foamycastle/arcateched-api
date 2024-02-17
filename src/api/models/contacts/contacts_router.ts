import * as RouteHandler from './route_handlers'
import * as RouteDef from './route_definitions'

const express = require('express')
export const contacts_router = express.Router()

contacts_router.param("id",Validation.validateContactId)
contacts_router.use(RouteDef.contacts_byName,Validation.validateContactName)

contacts_router.get(RouteDef.contacts_byType,RouteHandler.contacts_byType_handler)
contacts_router.get(RouteDef.contacts_byName,RouteHandler.contacts_byName_handler)
contacts_router.get(RouteDef.contacts_byId,RouteHandler.contacts_byId_handler)
contacts_router.post(RouteDef.contacts_create,RouteHandler.contacts_create_handler)