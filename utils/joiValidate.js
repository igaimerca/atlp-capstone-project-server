import Joi from "joi";

export const BlogSchema = Joi.object({
  title: Joi.string().required().min(2).max(1000),
  banner: Joi.string(),
  likes: Joi.number(),
  comments: Joi.array(),
  description: Joi.string().min(2).max(1000),
});

export const QuerySchema = Joi.object({
  name: Joi.string().required().min(2).max(1000),
  email: Joi.string().email(),
  subject: Joi.string().required().min(2).max(1000),
  message: Joi.string().min(2).max(1000),
});

export const UserSchema = Joi.object({
  name: Joi.string().required().min(2).max(1000),
  email: Joi.string().email(),
  position: Joi.string().required().min(2).max(35),
  experience: Joi.string().required().min(2).max(35),
  company: Joi.string().min(2).max(100),
  password: Joi.string().min(6).max(50),
  role: Joi.string()
});
