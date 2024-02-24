import Joi from "joi";
import Prisma from "@prisma/client";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    id:MachineDataValidation.id,
    commentId:MachineDataValidation.id,
    content:MachineDataValidation.comment
})

export default inputValidation