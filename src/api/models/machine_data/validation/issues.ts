import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../../../../validation/schemas/UUID";

export const issues =
    Joi.object<Prisma.Prisma.issuesCreateOrConnectWithoutMachine_dataInput>({
        where:Joi.object<Prisma.Prisma.issuesWhereUniqueInput>({
            id:UUID.required()
        }),
        create:Joi.object<Prisma.Prisma.issuesCreateWithoutMachine_dataInput>({}).required()

    })
