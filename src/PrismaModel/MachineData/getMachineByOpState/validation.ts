import Joi from "joi";
import Prisma from "@prisma/client";

const inputValidation=
    Joi.array()
        .items(
            Joi.string()
                .valid(
                    ...Object.keys(Prisma.$Enums.opState)
                )
        )
        .min(1)
        .max(4)

export default inputValidation;