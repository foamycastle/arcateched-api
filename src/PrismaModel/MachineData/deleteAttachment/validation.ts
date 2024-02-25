import Joi from "joi";
import Prisma from "@prisma/client";
import * as MachineDataValidation from "../../../validation/model/MachineData"

const inputValidation = Joi.object({
    id:MachineDataValidation.id,
    attachmentId:MachineDataValidation.id
})

export default inputValidation