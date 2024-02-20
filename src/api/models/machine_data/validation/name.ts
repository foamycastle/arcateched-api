import Joi from "joi";

export function name():Joi.StringSchema{
    return Joi.string()
        .max(64)
        .alphanum()
}
export function nameRequired():Joi.StringSchema{
    return name().required();
}
export function nameObject(required:boolean):Joi.ObjectSchema{
    return Joi.object({
        name: (
            required
                ? nameRequired()
                : name()
        )
    })
}

export function nameWithSearchMethodObject():Joi.ObjectSchema{
    return nameObject(true).append({
        searchMethod: Joi.string()
            .valid('startsWith', 'endsWith', 'contains', 'equals', 'search')
            .max(1)
            .optional()
    })
}