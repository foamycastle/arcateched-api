import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const keys =
    Joi.object<Prisma.Prisma.keysCreateOrConnectWithoutMachine_data_serviceKeyInput>({
        where:Joi.object<Prisma.Prisma.keysWhereUniqueInput>({
            id:UUID.required()
        }).required(),

        create:Joi.object().required()
    })
