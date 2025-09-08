import Joi from "joi";

export const userValidatorSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),
});

export const loginValidatorSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(8).required(),
});