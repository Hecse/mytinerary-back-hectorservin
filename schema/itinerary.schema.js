import Joi from "joi";

export const createItinerarySchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(30),
    photo: Joi.string()
        .required()
        .uri(),
    price: Joi.number()
        .required()
        .min(1)
        .max(10),
    duration: Joi.number()
        .required(),
    hashtag: Joi.string()
        .required()
        .max(50),
    city: Joi.string()
        .required()
        .min(2)
        .max(30),
    user: Joi.string()
        .required()
        .max(50),
})