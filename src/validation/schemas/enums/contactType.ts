import Joi from "joi";
import Prisma from "@prisma/client";

const prismaEnum = Object.keys(Prisma.$Enums.contactType)
export const contactType =
    Joi.array<Prisma.$Enums.contactType>()
        .items(
            Joi.string()
                .valid(...prismaEnum)
        )
        .min(1)
        .max(prismaEnum.length)
