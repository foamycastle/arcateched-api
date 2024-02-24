import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/machine data"

const inputValidation = Joi.object({
    dateOfMfg: MachineDataValidation.dateMaxNow,
    searchMethod: MachineDataValidation.numberCompareMethod
})

export default inputValidation