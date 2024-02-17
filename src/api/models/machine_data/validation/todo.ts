import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../../../../validation/schemas/UUID";

export const todo =
    Joi.object<Prisma.Prisma.todoCreateOrConnectWithoutMachine_dataInput>({
        where:Joi.object<Prisma.Prisma.todoWhereUniqueInput>({
            id:UUID.required()
        }),
        create:Joi.object<Prisma.Prisma.todoCreateWithoutMachine_dataInput>({}).required()

    })
