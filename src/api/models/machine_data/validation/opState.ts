import Joi from "joi";
import {$Enums} from "@prisma/client";

export function opState<T>() {
    return Joi.array()
        .items(...Object.keys($Enums.opState))
        .max(3)
        .optional()
}