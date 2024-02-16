import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const keys =
    Joi.object<Prisma.Prisma.keysCreateNestedOneWithoutMachine_data_cabinetKeyInput>({
        connect:Joi.object<Prisma.Prisma.keysWhereUniqueInput>({
            id:UUID.required()
        }),
    })
