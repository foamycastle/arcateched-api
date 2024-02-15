import Joi from "joi";
import Prisma from "@prisma/client";

export const gameType=Joi.array().optional()
    .items(
        Joi
            .string()
            .valid(...Array<Prisma.$Enums.gameType>(Prisma.gameType[Symbol.iterator]))
    )