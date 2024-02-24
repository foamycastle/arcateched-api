import Joi from "joi";
import Prisma from "@prisma/client";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    machineId:MachineDataValidation.id,
    content:MachineDataValidation.comment
})

export default inputValidation