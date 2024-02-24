import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/MachineData"

const inputValidation = Joi.object({
    machineId:MachineDataValidation.id.required(),
    dateBegin:MachineDataValidation.dateBegin.optional(),
    dateEnd:MachineDataValidation.dateEnd.optional(),
    content:Joi.string().max(32).optional()
})

export default inputValidation