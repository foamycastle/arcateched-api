import Joi from "joi";

export function modelNumber(): Joi.StringSchema {
    return Joi.string()
        .max(64)
        .alphanum()
}

export function modelNumberRequired(): Joi.StringSchema {
    return modelNumber().required();
}

export function modelNumberObject(required: boolean): Joi.ObjectSchema {
    return Joi.object({
        modelNumber: (
            required
                ? modelNumber().required()
                : modelNumber()
        )
    })
}

export function modelNumberWithSearchMethodObject(): Joi.ObjectSchema {
    return modelNumberObject(true).append({
        searchMethod: Joi.string()
            .valid('startsWith', 'endsWith', 'contains', 'equals', 'search')
            .max(1)
            .optional()
    })
}