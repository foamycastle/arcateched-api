import Joi from "joi";
import Prisma from "@prisma/client";
import * as MachineDataValidation from "../../../validation/model/MachineData"
import {MachineData} from "../index";

const inputValidation = Joi.object({
    id:MachineDataValidation.id.required(),
    data:MachineDataValidation.attachmentData.required()
})

export default inputValidation