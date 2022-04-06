const Joi = require('joi');

module.exports.BlogSchema = Joi.object({
    title: Joi.string().required().min(2).max(1000),
    banner: Joi.string(),
    likes: Joi.number(),
    comments: Joi.array(),
    description: Joi.string().min(2).max(1000),
});