import Joi from "joi";
import {$Enums} from "@prisma/client";

export function gameType() {
    return Joi.array()
        .items(...Object.keys($Enums.gameType))
        .max(3)
        .optional()
}