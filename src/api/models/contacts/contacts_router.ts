import * as RouteHandler from './route_handlers'
import * as RouteDef from './route_definitions'

const express = require('express')
export const contacts_router = express.Router()


contacts_router.get(RouteDef.contacts_byType,RouteHandler.contacts_byType_handler)