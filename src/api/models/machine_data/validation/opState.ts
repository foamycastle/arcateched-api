import Joi from "joi";
import {$Enums} from "@prisma/client";

export function opState() {
    return Joi.array()
        .items(...Object.keys($Enums.opState))
        .max(3)
}