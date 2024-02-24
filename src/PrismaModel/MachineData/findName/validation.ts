import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    name:MachineDataValidation.name.required(),
    searchMethod:MachineDataValidation.stringCompareMethod
})

export default inputValidation