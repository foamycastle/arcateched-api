import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/MachineData"

const inputValidation = Joi.object({
    modelNumber: MachineDataValidation.modelNumber.required(),
    searchMethod: MachineDataValidation.stringCompareMethod.optional()
})

export default inputValidation