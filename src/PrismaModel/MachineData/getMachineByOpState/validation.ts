import Joi from "joi";
import Prisma from "@prisma/client";

const inputValidation=
    Joi.array()
        .items(
            Joi.string()
                .valid(
                    Array.of(Prisma.$Enums.opState)
                )
        )
        .unique()
        .max(4)

export default inputValidation;