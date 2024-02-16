import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const contacts =
    Joi.object<Prisma.Prisma.contactsCreateNestedOneWithoutMachine_dataInput>({
        connect:Joi.object<Prisma.Prisma.contactsWhereUniqueInput>({
            id:UUID.required()
        }),
    })
