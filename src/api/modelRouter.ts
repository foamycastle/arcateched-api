import {machine_data_router} from "./models/machine_data/machine_data_router"
import {NextFunction, Request, Response} from "express";
import {machine_data_root} from "./models/machine_data/route_definitions";
import {contacts_root} from "./models/contacts/route_definitions";
import {contacts_router} from "./models/contacts/contacts_router";
const express = require('express')
export const modelRouter = express.Router()


modelRouter.use(machine_data_root,machine_data_router)
modelRouter.use(contacts_root,contacts_router)

console.log('model router')
