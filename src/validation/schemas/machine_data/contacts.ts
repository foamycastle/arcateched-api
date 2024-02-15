import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const contacts =
    Joi.object<Prisma.Prisma.contactsCreateOrConnectWithoutMachine_dataInput>({

        where:Joi.object<Prisma.Prisma.contactsWhereUniqueInput>({
            id:UUID.required()
        })
            .required(),

        create:Joi.object().required()
    })
