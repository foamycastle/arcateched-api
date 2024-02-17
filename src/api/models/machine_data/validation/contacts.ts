import Joi from "joi";
import Prisma from "@prisma/client";

export const contacts =
    Joi.object<Prisma.Prisma.contactsCreateNestedOneWithoutMachine_dataInput>({
        create:Joi.object().optional(),
        connectOrCreate:Joi.object().optional(),
        connect:Joi.object().optional()
    })
