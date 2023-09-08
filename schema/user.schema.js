import Joi from "joi";

export const createUserSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 }),
    name: Joi.string()
        .required()
        .min(2)
        .max(50),
    // .regex(caracteres alfabeticos investigar)
    lastname: Joi.string()
        .required()
        .min(2)
        .max(50),
    // .regex(caracteres alfabeticos investigar)    
    password: Joi.string()
        .required()
        .min(8)
        .max(35)
        .alphanum(),
    image: Joi.string()
        .uri()
})