import Joi from "joi";
import Prisma from "@prisma/client";

const inputValidation =
    Joi.array()
        .items(
            Joi.string()
                .valid(
                ...Object.keys(Prisma.$Enums.gameType)
                )
        )
        .min(1)
        .max(3)

export default inputValidation