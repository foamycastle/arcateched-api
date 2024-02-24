import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    modelNumber: MachineDataValidation.modelNumber.required(),
    searchMethod: MachineDataValidation.stringCompareMethod.optional()
})

export default inputValidation