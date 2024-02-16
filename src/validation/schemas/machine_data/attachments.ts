import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const attachments =
    Joi.object<Prisma.Prisma.attachmentsCreateNestedManyWithoutMachine_dataInput>({

        createMany:Joi.object().optional(),
        connect:Joi.object().optional(),
        create:Joi.object().optional(),
        connectOrCreate:Joi.object().optional()

    })
