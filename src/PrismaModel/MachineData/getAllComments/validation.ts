import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    machineId:MachineDataValidation.id,
    ...MachineDataValidation.dateRange.optional(),
    contents:Joi.string().max(32)
})

export default inputValidation