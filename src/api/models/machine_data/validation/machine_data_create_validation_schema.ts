import Joi from "joi";
import {Prisma} from "@prisma/client";
import {gameType} from "./gameType";
import {contacts} from "./contacts";
import {attachments} from "./attachments";
import {machine_zones} from "./machine_zones";
import {keys} from "./keys";
import {opState} from "./opState";

export const machine_dataCreateValidationSchema=
    Joi.object<Prisma.machine_dataCreateInput>({
        name:Joi.string()
            .required()
            .min(4)
            .max(64)
            .truncate()
            .trim(),
        modelNumber:Joi.string()
            .max(32)
            .trim()
            .optional(),
        serialNumber:Joi.string()
            .required()
            .max(32)
            .trim(),
        dateEnter:Joi.date().optional(),
        dateExit:Joi.date().optional(),
        dateOfMfg:Joi.date().optional()
            .less(Joi.ref('dateEntered')),
        gameType:gameType,
        occupied:Joi.number().precision(3),
        opState:opState,

        contacts:contacts.optional(),
        attachments:attachments.optional(),
        machine_zones:machine_zones.optional(),
        cabinetKey:keys.optional(),
        serviceKey:keys.optional(),

    })