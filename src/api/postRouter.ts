import {Request, Response, NextFunction} from "express";
import createNewGame from "../CRUD/machine_data/post_Machine_Data";
import validateCreateMachine_Data from "../validation/post/validateCreateMachine_Data";
import * as postRoutePaths from '../rsc/postRouterPaths'
import * as postRouteHandlers from "./postHandlers";
const express = require("express")
export const postRouter=express.Router()

postRouter.use(postRoutePaths.postMachineDataPath,validateCreateMachine_Data)

postRouter.post(postRoutePaths.postMachineDataPath,postRouteHandlers.postMachineDataHandler)

console.log('postRouter')