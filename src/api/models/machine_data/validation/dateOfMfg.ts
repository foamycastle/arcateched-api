import Joi from "joi";

export function dateOfMfg(): Joi.DateSchema {
    return Joi.date()
        .max('now')
}

export function dateOfMfgRequired(): Joi.DateSchema {
    return dateOfMfg().required();
}

export function dateOfMfgObject(required: boolean): Joi.ObjectSchema {
    return Joi.object({
        dateOfMfg: (
            required
                ? dateOfMfgRequired()
                : dateOfMfg()
        )
    })
}

export function dateOfMfgWithSearchMethodObject(): Joi.ObjectSchema {
    return dateOfMfgObject(true)
        .append({
            searchMethod: Joi.string()
                .valid('lt', 'lte', 'gt', 'gte')
                .max(1)
                .optional()
        })
        .append({

        })
}