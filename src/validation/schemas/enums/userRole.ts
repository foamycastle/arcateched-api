import Joi from "joi";
import Prisma from "@prisma/client";

const prismaEnum = Object.keys(Prisma.$Enums.user_role)
export const userRole =
    Joi.array<Prisma.$Enums.user_role>()
        .items(
            Joi.string()
                .valid(...prismaEnum)
        )
        .min(1)
        .max(prismaEnum.length)
