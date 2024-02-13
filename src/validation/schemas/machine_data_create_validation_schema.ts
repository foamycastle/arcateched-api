import Joi from "joi";
import {gameType} from "@prisma/client";

export const machine_dataCreateValidationSchema=Joi.object({
    gameName:Joi.string()
        .required()
        .min(4)
        .max(64).truncate()
        .trim(),
    modelNumber:Joi.string()
        .max(32)
        .trim(),
    serialNumber:Joi.string()
        .required()
        .max(32)
        .trim(),
    dateEntered:Joi.date(),
    dateOfMfg:Joi.date()
        .less(Joi.ref('dateEntered')),
    mfgUUID:Joi.string()
        .uuid({
            version:[
                'uuidv1',
                'uuidv4'
            ]
        }),
    cabinetKey:Joi.ref('mfgUUID'),
    serviceKey:Joi.ref('mfgUUID'),
    gameType:Joi.array<gameType>(),
    gameZone:Joi.ref('mfgUUID'),
    occupied:Joi.number().precision(3)
})