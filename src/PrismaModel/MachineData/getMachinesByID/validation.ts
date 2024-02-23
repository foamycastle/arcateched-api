import Joi from "joi";

const inputValidation=Joi.array()
    .items(
        Joi.string()
            .uuid(
                {version:['uuidv1',"uuidv4"]}
            )
    )
export default inputValidation;
