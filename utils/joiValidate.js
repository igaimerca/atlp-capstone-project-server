import Joi from "joi";

export const BlogSchema = Joi.object({
    title: Joi.string().required().min(2).max(1000),
    banner: Joi.string(),
    likesCount: Joi.number(),
    comments: Joi.array(),
    description: Joi.string().min(2).max(1000),
});