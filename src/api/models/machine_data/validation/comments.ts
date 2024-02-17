import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../../../../validation/schemas/UUID";

export const comments =
    Joi.object<Prisma.Prisma.commentsCreateNestedManyWithoutMachine_dataInput>({
        create:Joi.object<Prisma.Prisma.commentsCreateArgs>({
            data:Joi.object<Prisma.Prisma.commentsCreateInput>({
                content:Joi.string().max(1024).required(),
                userRole:Joi.object().optional()
            })
        })
    })
