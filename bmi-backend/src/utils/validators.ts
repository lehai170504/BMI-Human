import Joi from 'joi';

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

export const validateRegister = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    height: Joi.number().min(0).required(),
    weight: Joi.number().min(0).required()
  });
  return schema.validate(data);
};