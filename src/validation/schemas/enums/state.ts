import Joi from "joi";
import Prisma from "@prisma/client";

const prismaEnum = Object.keys(Prisma.$Enums.state)
export const state =
    Joi.array<Prisma.$Enums.state>()
        .items(
            Joi.string()
                .valid(...prismaEnum)
        )
        .min(1)
        .max(prismaEnum.length)
