import Joi from "joi";
import Prisma, {$Enums} from "@prisma/client";


export function gameType() {
    return Joi.array()
        .items(...Object.keys($Enums.gameType))
        .max(3)
        .optional()
}