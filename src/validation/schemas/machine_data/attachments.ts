import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const attachments =
    Joi.object<Prisma.Prisma.attachmentsCreateOrConnectWithoutMachine_dataInput>({
       where:Joi.object<Prisma.Prisma.keysWhereUniqueInput>({
           id:UUID
       })
           .required(),

       create:Joi.object().required()
    })
