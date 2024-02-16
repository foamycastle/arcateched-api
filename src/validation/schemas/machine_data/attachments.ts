import Joi from "joi";
import {Prisma} from "@prisma/client";
import {UUID} from "../UUID";

export const attachments = Joi.object<Prisma.attachmentsCreateNestedManyWithoutMachine_dataInput>({
    create:Joi.object().optional(),
    createMany:Joi.object().optional(),
    connectOrCreate:Joi.object().optional(),
    connect:Joi.object().optional()
})

