import Joi from 'joi';
import Prisma from "@prisma/client";

export const id = Joi.string().uuid()
export const name = Joi.string().min(1).max(64)
export const modelNumber = Joi.string().min(1).max(32).allow("")
export const serialNumber = Joi.string().min(1).max(32)
export const gameType = Joi.array().allow(...Object.keys(Prisma.$Enums.gameType))
export const playerCount = Joi.number().min(1).max(6).integer()
export const comment = Joi.string().min(1).max(255).regex(/^.*$/)
export const dateMaxNow = Joi.date().max('now')
export const stringCompareMethod= Joi.string().valid('startsWith','endsWith','contains','equals')
export const numberCompareMethod= Joi.string().valid('lte','lt','gte','gt','equals')
export const dateBegin=Joi.date().less('now')
export const dateEnd=Joi.date().less('now')
export const optimalVoltage = Joi.number().min(100).max(240).precision(3)
export const currentDraw = Joi.number().min(0).max(30).precision(3)
export const powerConsumption = Joi.number().min(0).max(2400).precision(3)
export const phase = Joi.string().valid(...Object.keys(Prisma.$Enums.elecPhase))
export const intPS = Joi.number().min(1).max(5).integer()

export const attachmentData=Joi.object({
    type:Joi.string().valid(...Object.keys(Prisma.$Enums.attType)).required(),
    path:Joi.string().required(),
    label:Joi.string().max(32).pattern(/^[A-Z0-9_.\- ]+$/i).optional()
})


