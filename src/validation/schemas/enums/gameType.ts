import Joi from "joi";
import Prisma from "@prisma/client";

const prismaEnum = Object.keys(Prisma.$Enums.gameType)
export const gameType =
    Joi.array<Prisma.$Enums.gameType>()
        .items(
            Joi.string()
                .valid(...prismaEnum)
        )
        .min(1)
        .max(prismaEnum.length)
