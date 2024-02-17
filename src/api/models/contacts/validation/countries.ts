import Joi from "joi";
import Prisma from "@prisma/client";

const prismaEnum = Object.keys(Prisma.$Enums.countries)
export const countries =
    Joi.array<Prisma.$Enums.countries>()
        .items(
            Joi.string()
                .valid(...prismaEnum)
        )
        .min(1)
        .max(prismaEnum.length)
