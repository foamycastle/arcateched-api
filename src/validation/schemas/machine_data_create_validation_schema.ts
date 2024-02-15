import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "./UUID";

export const machine_dataCreateValidationSchema=Joi.object({
    gameName:Joi.string()
        .required()
        .min(4)
        .max(64)
        .truncate()
        .trim(),
    modelNumber:Joi.string()
        .max(32)
        .trim()
        .optional(),
    serialNumber:Joi.string()
        .required()
        .max(32)
        .trim(),
    dateEntered:Joi.date().optional(),
    dateExit:Joi.date().optional(),
    dateOfMfg:Joi.date().optional()
        .less(Joi.ref('dateEntered')),
    gameType:Joi.array().optional()
        .items(
            Joi
                .string()
                .valid(...Array<Prisma.$Enums.gameType>(Prisma.gameType[Symbol.iterator]))
        ),
    gameZone:UUID,
    occupied:Joi.number().precision(3),
    contacts:Joi.object().optional(),
    attachments:Joi.object().optional(),
    keys:Joi.object().optional(),

})