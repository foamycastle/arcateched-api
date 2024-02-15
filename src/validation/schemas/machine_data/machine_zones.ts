import Joi from "joi";
import Prisma from "@prisma/client";
import {UUID} from "../UUID";

export const machine_zones =
    Joi.object<Prisma.Prisma.machine_zonesCreateOrConnectWithoutMachine_dataInput>({

        where:Joi.object<Prisma.Prisma.machine_zonesWhereUniqueInput>({
            id:UUID.required()
        }).required(),

        create:Joi.object().required()
    })
