import Joi from "joi";
import Prisma from "@prisma/client";

export const opState=Joi.array().optional()
    .items(
        Joi
            .string()
            .valid(...Array<Prisma.$Enums.opState>(Prisma.opState[Symbol.iterator]))
    )