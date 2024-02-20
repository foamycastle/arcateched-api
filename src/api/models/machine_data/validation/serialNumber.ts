import Joi from "joi";

export function serialNumber():Joi.StringSchema {
    return Joi.string()
        .max(32)
        .alphanum()
}
export function serialNumberRequired():Joi.StringSchema{
    return serialNumber().required()
}

export function serialNumberObject(required:boolean):Joi.ObjectSchema{
    return Joi.object({
        serialNumber:(
            required
                ? serialNumberRequired()
                : serialNumber()
        )
    })
}

export function serialNumberWithSearchMethodObject():Joi.ObjectSchema{
    return serialNumberObject(true).append({
        searchMethod: Joi.string()
            .valid('startsWith', 'endsWith', 'contains', 'equals', 'search')
            .max(1)
            .optional()

    })
}