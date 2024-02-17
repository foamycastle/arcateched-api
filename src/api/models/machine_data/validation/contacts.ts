import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../../../../validation/schemas/UUID";

export const contacts =
    Joi.object<Prisma.Prisma.contactsCreateNestedOneWithoutMachine_dataInput>({
        create:Joi.object().optional(),
        connectOrCreate:Joi.object().optional(),
        connect:Joi.object().optional()
    })
