import Joi from 'joi';
import Prisma from "@prisma/client";

export const id = Joi.string().uuid()
export const name = Joi.string().alphanum().min(1).max(64)
export const modelNumber = Joi.string().min(1).max(32)
export const serialNumber = Joi.string().min(1).max(32)
export const gameType = Joi.string().valid(...Array.of(Prisma.$Enums.gameType))
export const playerCount = Joi.number().min(1).max(6).integer()

