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

module.exports.UserSchema = Joi.object({
  name: Joi.string().required().min(2).max(1000),
  email: Joi.string().email(),
  position: Joi.string().required().min(2).max(35),
  experience: Joi.string().required().min(2).max(35),
  company: Joi.string().min(2).max(100),
  password: Joi.string().min(6).max(50),
  role: Joi.string()
});
