import Joi from "joi";

export const bookValidatorSchema = Joi.object({
    title : Joi.string().required(),
    author: Joi.string().required(),
    isbn:Joi.string().allow(null).optional(),
    category:Joi.string().required(),
    copies:Joi.number().min(1).required(),
});

export const updateValidatorSchema = Joi.object({
    title : Joi.string().required(),
    author: Joi.string().required(),
    category:Joi.string().required(),
    copies:Joi.number().min(1).required(),
});