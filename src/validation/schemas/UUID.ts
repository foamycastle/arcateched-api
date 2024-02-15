import Joi from "joi";

export const UUID = Joi.string().uuid({version:['uuidv4','uuidv1']})