const Joi = require("joi");

module.exports.BlogSchema = Joi.object({
  title: Joi.string().required().min(2).max(1000),
  banner: Joi.string(),
  likes: Joi.number(),
  comments: Joi.array(),
  description: Joi.string().min(2).max(1000),
});

module.exports.QuerySchema = Joi.object({
  name: Joi.string().required().min(2).max(1000),
  email: Joi.string().email(),
  project: Joi.string().required().min(2).max(1000),
  message: Joi.string().min(2).max(1000),
});
