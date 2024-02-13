import Joi, {string} from "joi";
import {gameType} from "@prisma/client";

export const machine_dataUpdateValidationSchema=Joi.object({
    id:Joi.string()
        .required()
        .uuid({
            version:[
                'uuidv1',
                'uuidv4'
            ]
        }),
    gameName:Joi.string()
        .min(4)
        .max(64).truncate()
        .trim(),
    modelNumber:Joi.string()
        .max(32)
        .trim(),
    serialNumber:Joi.string()
        .max(32)
        .trim(),
    dateEntered:Joi.date(),
    dateOfMfg:Joi.date()
        .less(Joi.ref('dateEntered')),
    mfgUUID:Joi.ref('id'),
    cabinetKey:Joi.ref('id'),
    serviceKey:Joi.ref('id'),
    gameType:Joi.array<gameType>(),
    gameZone:Joi.ref('id'),
    occupied:Joi.number().precision(3)
})