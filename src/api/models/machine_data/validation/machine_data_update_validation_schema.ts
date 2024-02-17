import Joi from "joi";
import {UUID} from "../../../../validation/schemas/UUID";
import Prisma from "@prisma/client";
import {gameType} from "./gameType";
import {opState} from "./opState";
import {contacts} from "./contacts";
import {attachments} from "./attachments";
import {machine_zones} from "./machine_zones";
import {keys} from "./keys";
import {issues} from "./issues";
import {todo} from "./todo";
import {comments} from "./comments";

export const machine_dataUpdateValidationSchema=
        Joi.object<Prisma.Prisma.machine_dataUpdateArgs>({
                where:Joi.object<Prisma.Prisma.machine_dataWhereUniqueInput>({
                        id:UUID
                }),
                data:Joi.object<Prisma.Prisma.machine_dataUpdateInput>({
                        name:Joi.string()
                            .optional()
                            .min(4)
                            .max(64)
                            .truncate()
                            .trim(),
                        modelNumber:Joi.string()
                            .max(32)
                            .trim()
                            .optional(),
                        serialNumber:Joi.string()
                            .optional()
                            .max(32)
                            .trim(),
                        dateEnter:Joi.date().optional(),
                        dateExit:Joi.date().optional(),
                        dateOfMfg:Joi.date().optional()
                            .less(Joi.ref('dateEntered')),
                        gameType:gameType,
                        occupied:Joi.number().precision(3),
                        playerCount:Joi.number().integer().max(6).optional(),
                        opState:opState,

                        contacts:contacts.optional(),
                        attachments:attachments.optional(),
                        machine_zones:machine_zones.optional(),
                        cabinetKey:keys.optional(),
                        serviceKey:keys.optional(),
                        issues:issues.optional(),
                        todo:todo.optional(),
                        comments:comments.optional()
                })
        })